import { PrismaClient } from '@prisma/client';
import passwordUtil from '../utils/password.js';

const prisma = new PrismaClient();

const userServices = {
	createUser: async (name, email, password) => {
		try {
			const existingUser = await prisma.user.findUnique({
				where: { email },
			});
			if (existingUser) {
				return { error: 'User with this email already exists' };
			}
			const hashedPassword = await passwordUtil.hashPassword(password);
			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			});
			return user;
		} catch (error) {
			console.error('Error creating user:', error);
			throw new Error('Internal Server Error');
		}
	},

	login: async (email, password) => {
		try {
			const user = await prisma.user.findUnique({
				where: { email },
			});
			if (!user) {
				return { error: 'User not found' };
			}
			const isPasswordValid = await passwordUtil.comparePassword(
				password,
				user.password
			);
			if (!isPasswordValid) {
				return { error: 'Invalid email and password combination' };
			}

			return user;
		} catch (error) {
			console.error('Error logging in user:', error);
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
};

export default userServices;
