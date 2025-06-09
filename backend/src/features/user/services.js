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
						role,
					},
				});

				logInfo('User created successfully:', newUser);

				// Create corresponding profile based on role
				if (newUser.role === 'STUDENT') {
					await tx.studentProfile.create({
						data: {
							userId: newUser.id,
						},
					});
				} else if (newUser.role === 'TUTOR') {
					await tx.tutorProfile.create({
						data: {
							userId: newUser.id,
						},
					});
				} else if (newUser.role === 'ADMIN') {
					await tx.adminProfile.create({
						data: {
							userId: newUser.id,
						},
					});
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
