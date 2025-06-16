import { expect, it, jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import passwordUtil from '../password.js';
const { hashPassword, comparePassword } = passwordUtil;
jest.mock('bcrypt');

describe('Password Utility Functions', () => {
	it('should hash a password successfully', async () => {
		const password = 'testPassword';
		const hashedPassword = 'hashedPassword';
		bcrypt.genSalt.mockResolvedValue('salt');
		bcrypt.hash.mockResolvedValue(hashedPassword);

		const result = await hashPassword(password);
		expect(result).toBe(hashedPassword);
		expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
		expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
	});

	it('should compare a password with a hashed password successfully', async () => {
		const password = 'testPassword';
		const hashedPassword = 'hashedPassword';
		bcrypt.compare.mockResolvedValue(true);

		const result = await comparePassword(password, hashedPassword);
		expect(result).toBe(true);
		expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
	});
});
