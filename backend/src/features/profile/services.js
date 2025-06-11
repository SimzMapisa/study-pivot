import prisma from '../../common/config/db.js';
import { logError } from '../../common/utils/logger.js';

const profileServices = {
	getProfile: async (req) => {
		try {
			const userId = req.user.id;

			// Get user with basic details
			const user = await prisma.user.findUnique({
				where: { id: userId },
				select: {
					id: true,
					email: true,
					name: true,
					role: true,
					avatar: true,
					address: true,
					isOnboarded: true,
					createdAt: true,
				},
			});

			if (!user) {
				throw { status: 404, message: 'User not found' };
			}

			let profileData = null;
			let bioData = await prisma.bio.findUnique({
				where: { userId },
				select: {
					id: true,
					content: true,
				},
			});

			// Get role-specific profile
			switch (user.role) {
				case 'ADMIN':
					profileData = await prisma.adminProfile.findUnique({
						where: { userId },
					});
					break;
				case 'STUDENT':
					profileData = await prisma.studentProfile.findUnique({
						where: { userId },
						include: {
							subjects: true,
						},
					});
					break;
				case 'TUTOR':
					profileData = await prisma.tutorProfile.findUnique({
						where: { userId },
						include: {
							subjects: true,
							ratings: {
								select: {
									rating: true,
									comment: true,
								},
							},
						},
					});
					break;
			}

			// Return combined data
			return {
				...user,
				profile: profileData,
				bio: bioData,
			};
		} catch (error) {
			logError('Error fetching profile:', error);
			if (error.status) throw error;
			throw { status: 500, message: 'Error fetching profile' };
		}
	},

	updateProfile: async (req, profileData) => {
		// For this method, you WOULD want to use a transaction
		try {
		} catch (error) {}
		// since you might update multiple related tables
	},

	deleteProfile: async (userId) => {},

	getProfilePicture: async (userId) => {},
};

export default profileServices;
