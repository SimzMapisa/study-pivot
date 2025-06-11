import crypto from 'crypto';
import passport from 'passport';
import prisma from '../../common/config/db.js';
import { logError, logInfo } from '../../common/utils/logger.js';
import passwordUtil from '../../common/utils/password.js';

const authServices = {
	login: (req, res, next) => {
		return new Promise((resolve, reject) => {
			passport.authenticate('local', (err, user, info) => {
				if (err) {
					logError('Authentication error:', err);
					return reject({ status: 500, message: 'Internal server error' });
				}

				if (!user) {
					return reject({
						status: 401,
						message: info?.message || 'Authentication failed',
					});
				}

				req.logIn(user, (loginErr) => {
					if (loginErr) {
						logError('Login error:', loginErr);
						return reject({ status: 500, message: 'Error logging in' });
					}

					return resolve({
						user: {
							id: user.id,
							email: user.email,
							name: user.name,
						},
					});
				});
			})(req, res, next);
		});
	},

	logout: (req) => {
		return new Promise((resolve) => {
			req.logout(() => {
				resolve({ message: 'Logout successful' });
			});
		});
	},

	checkAuthStatus: (req) => {
		return {
			isAuthenticated: req.isAuthenticated(),
			user: req.isAuthenticated()
				? {
						id: req.user.id,
						email: req.user.email,
						name: req.user.name,
				  }
				: null,
		};
	},

	resetPassword: async (req) => {
		try {
			const { email } = req.body;
			if (!email) {
				throw { status: 400, message: 'Email is required' };
			}

			const user = await prisma.user.findUnique({
				where: { email },
			});

			if (!user) {
				throw { status: 404, message: 'User not found' };
			}

			// Generate reset token
			const resetToken = crypto.randomBytes(32).toString('hex');
			const hashedToken = crypto
				.createHash('sha256')
				.update(resetToken)
				.digest('hex');

			const tokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
			const tokenData = {
				data: {
					token: hashedToken,
					expires: tokenExpires,
					userId: user.id,
				},
			};
			await prisma.passwordResetToken.create(tokenData);

			// Create reset URL
			const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

			logInfo(`Reset token is ${resetToken} for user ${user.email}`);

			// Send reset email
			// await sendEmail({
			// 	to: user.email,
			// 	subject: 'Password Reset Request',
			// 	text: `You requested a password reset. Please click on the following link to reset your password: ${resetUrl}. This link is valid for 10 minutes.`,
			// 	html: `
			// 		<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
			// 			<h2>Password Reset Request</h2>
			// 			<p>Hello ${user.name},</p>
			// 			<p>You requested a password reset for your Study Pivot account.</p>
			// 			<p>Please click the button below to reset your password. This link is valid for 10 minutes.</p>
			// 			<div style="text-align: center; margin: 30px 0;">
			// 				<a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px; font-weight: bold;">
			// 					Reset Your Password
			// 				</a>
			// 			</div>
			// 			<p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
			// 			<p>Best regards,<br>The Study Pivot Team</p>
			// 		</div>
			// 	`,
			// });

			return {
				message: 'Password reset instructions sent to your email',
			};
		} catch (error) {
			logError('Error resetting password:', error);

			// Preserve custom error format
			if (error.status) throw error;

			throw { status: 500, message: 'Error processing password reset' };
		}
	},

	confirmResetPassword: async (req) => {
		try {
			const { token, password, confirmPassword } = req.body;

			if (confirmPassword !== password) {
				throw { status: 400, message: 'Passwords do not match' };
			}

			if (!token || !password) {
				throw { status: 400, message: 'Token and password are required' };
			}

			// Hash the token to compare with stored hash
			const hashedToken = crypto
				.createHash('sha256')
				.update(token)
				.digest('hex');

			// Find the reset token in the database
			const dbToken = await prisma.passwordResetToken.findFirst({
				where: {
					token: hashedToken,
					expires: {
						gt: new Date(), // Token hasn't expired
					},
				},
			});

			if (!dbToken) {
				throw { status: 400, message: 'Invalid or expired token' };
			}

			// Update user password and clear reset token
			const hashedPassword = await passwordUtil.hashPassword(password);
			const user = await prisma.user.update({
				where: { id: dbToken.userId },
				data: {
					password: hashedPassword,
				},
			});

			// Clear the reset token
			await prisma.passwordResetToken.deleteMany({
				where: { userId: user.id },
			});

			return { message: 'Password has been reset successfully' };
		} catch (error) {
			logError('Error confirming password reset:', error);

			// Preserve custom error format
			if (error.status) throw error;

			throw { status: 500, message: 'Error resetting password' };
		}
	},

	changePassword: async (req) => {
		try {
			// TODO: Get authenticated user from request
			const user = req.user;
			if (!user) {
				throw { status: 401, message: 'User not authenticated' };
			}
			console.log('User:', user);
			// TODO: Get current and new password from request
			const { currentPassword, newPassword, confirmPassword } = req.body;
			// TODO: Validate current password
			if (!currentPassword || !newPassword || !confirmPassword) {
				throw {
					status: 400,
					message:
						'Current password, new password, and confirm password are required',
				};
			}

			const isCurrentPasswordValid = await passwordUtil.comparePassword(
				currentPassword,
				user.password
			);

			if (!isCurrentPasswordValid) {
				throw {
					status: 401,
					message: 'Current password is incorrect',
				};
			}

			if (newPassword !== confirmPassword) {
				throw {
					status: 400,
					message: 'New password and confirm password do not match',
				};
			}

			// TODO: Hash new password
			const hashedNewPassword = await passwordUtil.hashPassword(newPassword);
			// TODO: Update user password in database
			await prisma.user.update({
				where: { id: user.id },
				data: {
					password: hashedNewPassword,
				},
			});
		} catch (error) {
			logError('Error changing password:', error);
			throw ('Error changing password:', error);
		}
	},
};

export default authServices;
