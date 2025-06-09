import prisma from '../../common/config/db.js';
import { logInfo } from '../../common/utils/logger.js';

export default async function cleanupExpiredSessions() {
	try {
		const currentDate = new Date();
		const deleted = await prisma.session.deleteMany({
			where: {
				expire: {
					lt: currentDate,
				},
			},
		});

		if (deleted.count === 0) {
			logInfo('No expired sessions found');
			return;
		}

		logInfo(`Cleaned up ${deleted.count} expired sessions`);
	} catch (error) {
		logInfo('Session cleanup failed:', error);
	}
}
