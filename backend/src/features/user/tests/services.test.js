import { it } from '@jest/globals';
import { mockDeep } from 'jest-mock-extended';
import prisma from '../../../common/config/db.js';
import passwordUtil from '../../../common/utils/password.js';
import userServices from '../services';

jest.mock('../../../common/config/db.js', () => ({
	__esModule: true,
	default: mockDeep(),
}));

jest.mock('../../../common/utils/password.js', () => ({
	__esModule: true,
	default: {
		hashPassword: jest.fn(),
	},
}));

jest.mock('../../../common/utils/logger.js', () => ({
	logInfo: jest.fn(),
	logError: jest.fn(),
}));

const { getUsers } = userServices;

describe('User Services', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should create a new user and their profile based on role', async () => {
		// Arrange
		// Mock user input
		const userInput = {
			name: 'Simba',
			surname: 'Mapisa',
			email: 'simba@example.com',
			password: 'mySecurePass!',
			role: 'tutor',
		};

		const hashedPassword = 'hashedSecurePass!';
		// Mock created user object
		// This is the user object that will be returned after creation
		const createdUser = {
			id: 101,
			...userInput,
			password: hashedPassword,
			role: 'TUTOR',
		};

		// Mock findUnique to simulate no existing user
		prisma.user.findUnique.mockResolvedValue(null);

		// Mock hashing
		passwordUtil.hashPassword.mockResolvedValue(hashedPassword);

		let tx;

		// 🔥 Mock the $transaction with function
		prisma.$transaction.mockImplementation(async (cb) => {
			tx = {
				user: {
					create: jest.fn().mockResolvedValue(createdUser),
				},
				adminProfile: {
					count: jest.fn().mockResolvedValue(0),
					create: jest.fn().mockResolvedValue(),
				},
				studentProfile: {
					create: jest.fn(),
				},
				tutorProfile: {
					create: jest.fn(),
				},
			};

			return await cb(tx);
		});

		// Act
		const result = await userServices.createUser(
			userInput.name,
			userInput.surname,
			userInput.email,
			userInput.password,
			userInput.role
		);

		// Assert
		expect(prisma.user.findUnique).toHaveBeenCalledWith({
			where: { email: userInput.email },
		});
		expect(passwordUtil.hashPassword).toHaveBeenCalledWith(userInput.password);
		expect(result).toEqual(createdUser);
		expect(prisma.$transaction).toHaveBeenCalledTimes(1);
		expect(tx.tutorProfile.create).toHaveBeenCalledTimes(1);
	});

	it('should return error if user with email already exists', async () => {
		prisma.user.findUnique.mockResolvedValue({
			id: 1,
			email: 'simba@example.com',
		});

		const result = await userServices.createUser(
			'Simba',
			'M',
			'simba@example.com',
			'abc',
			'student'
		);

		expect(result).toEqual({ error: 'User with this email already exists' });
		expect(prisma.$transaction).not.toHaveBeenCalled();
	});

	it('should get all users', async () => {
		const mockUsers = [
			{ id: 1, name: 'John Doe', email: 'john.doe@example.com' },
			{ id: 1, name: 'John Doe', email: 'john.doe@example.com' },
		];
		prisma.user.findMany.mockResolvedValue(mockUsers);

		const result = await getUsers();

		expect(result).toEqual(mockUsers);
		expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
		expect(prisma.user.findMany).toHaveBeenCalledWith();
		expect(result).toHaveLength(2);
	});

	it('should handle errors when getting users', async () => {
		prisma.user.findMany.mockRejectedValue(new Error('Database error'));
		expect(getUsers()).rejects.toThrow('Internal Server Error');
	});
});
