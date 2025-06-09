import cron from 'node-cron';
import { logInfo } from '../common/utils/logger.js';
import cleanupTokens from '../common/utils/password-token-cleanup.js';

// Run session cleanup every day at midnight
async function scheduledTokenCleanup() {
	// Schedule the token cleanup job
	cron.schedule('0 0 * * *', async () => {
		try {
			logInfo('Running scheduled token cleanup...');
			await cleanupTokens();
		} catch (error) {
			logInfo('Error during token cleanup:', error);
		}
	});
}

export default scheduledTokenCleanup;
