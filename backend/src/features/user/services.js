import prisma from '../../common/config/db.js';
import { logError, logInfo } from '../../common/utils/logger.js';
import passwordUtil from '../../common/utils/password.js';
/**
 * User services for creating and fetching users.
 * This module handles user-related operations such as creating a new user
 * and retrieving all users from the database.
 *
 * @module userServices
 */
const userServices = {
	/**
	 * Uses Prisma ORM transactions to create a new user and their profile based on their roles.
	 * Creates a new user with the provided details from the req body.
	 * If a user with the same email already exists, it returns an error.
	 * The user's password is hashed before storing it in the database.
	 *
	 * @param {string} name - The name of the user.
	 * @param {string} surname - The surname of the user.
	 * @param {string} email - The email of the user.
	 * @param {string} password - The password of the user.
	 * @param {string} role - The role of the user (e.g., STUDENT, TUTOR, ADMIN).
	 * @returns {Promise<Object>} The created user object or an error message if the user already exists.
	 * @throws {Error} If an error occurs during user creation or if the role is invalid.
	 */
	createUser: async (name, surname, email, password, role) => {
		try {
			const existingUser = await prisma.user.findUnique({
				where: { email },
			});
			if (existingUser) {
				return { error: 'User with this email already exists' };
			}

			const hashedPassword = await passwordUtil.hashPassword(password);

			// Use transaction to create user and profile together
			const user = await prisma.$transaction(async (tx) => {
				// Create the user first
				const newUser = await tx.user.create({
					data: {
						name,
						surname,
						email,
						password: hashedPassword,
						role: role.toUpperCase(),
					},
				});

				logInfo('User created successfully:', newUser);

				const adminCount = await tx.adminProfile.count({
					where: {
						user: {
							role: 'ADMIN',
						},
					},
				});

				switch (newUser.role) {
					case 'STUDENT':
						await tx.studentProfile.create({
							data: {
								userId: newUser.id,
							},
						});
						break;

					case 'TUTOR':
						await tx.tutorProfile.create({
							data: {
								userId: newUser.id,
							},
						});
						break;
					case 'ADMIN':
						await tx.adminProfile.create({
							data: {
								userId: newUser.id,
								permissions: adminCount === 0 ? ['super_admin'] : [],
							},
						});
						break;
					default:
						logError('Invalid user role:', newUser.role);
						throw new Error('Invalid user role');
				}

				return newUser;
			});

			logInfo('User created successfully with profile');
			return user;
		} catch (error) {
			logError('Error creating user:', error);
			throw new Error('Internal Server Error');
		}
	},

	getUsers: async () => {
		try {
			const users = await prisma.user.findMany();
			return users;
		} catch (error) {
			console.error('Error fetching users:', error);
			throw new Error('Internal Server Error');
		}
	},

	getStudents: async () => {
		try {
			const students = await prisma.studentProfile.findMany({
				include: {
					user: true, // Include user details
				},
			});
			return students;
		} catch (error) {
			logError('Error fetching students:', error);
			throw new Error('Internal Server Error');
		}
	},
};

export default userServices;
