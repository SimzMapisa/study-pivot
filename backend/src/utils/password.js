import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

const passwordUtil = {
	hashPassword: async (password) => {
		try {
			const salt = await bcrypt.genSalt(SALT_ROUNDS);
			const hashedPassword = await bcrypt.hash(password, salt);
			return hashedPassword;
		} catch (error) {
			console.error('Error hashing password:', error);
			throw new Error('Internal Server Error');
		}
	},
	comparePassword: async (password, hashedPassword) => {
		try {
			const isMatch = await bcrypt.compare(password, hashedPassword);
			return isMatch;
		} catch (error) {
			console.error('Error comparing password:', error);
			throw new Error('Internal Server Error');
		}
	},
};

export default passwordUtil;
