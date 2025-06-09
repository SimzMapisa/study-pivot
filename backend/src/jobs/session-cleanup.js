import cron from 'node-cron';
import { logInfo } from '../common/utils/logger.js';
import cleanupExpiredSessions from '../features/session/sessionCleanup.js';

// Run session cleanup every day at midnight
async function scheduledSessionCleanup() {
	// will run the cleanup once per week on Sunday at midnight
	cron.schedule('0 0 * * 7', async () => {
		try {
			logInfo('Running scheduled session cleanup...');
			await cleanupExpiredSessions();
		} catch (error) {
			logInfo('Error during session cleanup:', error);
		}
	});
}

export default scheduledSessionCleanup;
