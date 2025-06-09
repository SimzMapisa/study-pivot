import bcrypt from 'bcrypt';
import { logError, logInfo } from './logger.js';

const SALT_ROUNDS = 10;

const passwordUtil = {
	hashPassword: async (password) => {
		try {
			const salt = await bcrypt.genSalt(SALT_ROUNDS);
			const hash = await bcrypt.hash(password, salt);
			logInfo('Password hashed successfully');
			return hash;
		} catch (error) {
			logError('Error hashing password:', error);
			throw new Error('Internal Server Error');
		}
	},

	comparePassword: async (password, hashedPassword) => {
		try {
			const isMatch = await bcrypt.compare(password, hashedPassword);
			return isMatch;
		} catch (error) {
			logError('Error comparing password:', error);
			throw new Error('Internal Server Error');
		}
	},
};

export default passwordUtil;
