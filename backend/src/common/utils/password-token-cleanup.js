import prisma from '../config/db.js';

async function cleanupTokens() {
	try {
		const now = new Date();
		await prisma.passwordResetToken.deleteMany({
			where: {
				expires: {
					lt: now,
				},
			},
		});
	} catch (error) {
		console.error('Error during token cleanup:', error);
		throw {
			status: 500,
			message: 'Error cleaning up expired tokens',
		};
	}
}

export default cleanupTokens;
