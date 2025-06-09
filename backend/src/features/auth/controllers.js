import authServices from './services.js';

const authController = {
	login: async (req, res, next) => {
		try {
			const result = await authServices.login(req, res, next);
			return res.status(200).json({
				message: 'Login successful',
				user: result.user,
			});
		} catch (error) {
			return res.status(error.status || 500).json({
				message: error.message || 'Authentication failed',
			});
		}
	},

	logout: async (req, res) => {
		try {
			const result = await authServices.logout(req);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(500).json({
				message: 'Error logging out',
			});
		}
	},

	checkAuthStatus: (req, res) => {
		const status = authServices.checkAuthStatus(req);
		return res.status(200).json(status);
	},

	resetPassword: async (req, res) => {
		try {
			const result = await authServices.resetPassword(req);
			return res.status(200).json({
				message: 'Password reset email sent',
				data: result,
			});
		} catch (error) {
			return res.status(error.status || 500).json({
				message: error.message || 'Failed to reset password',
			});
		}
	},

	confirmResetPassword: async (req, res) => {
		try {
			const result = await authServices.confirmResetPassword(req);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(error.status || 500).json({
				message: error.message || 'Error resetting password',
			});
		}
	},

	changePassword: async (req, res) => {
		try {
			const result = await authServices.changePassword(req);
			return res.status(200).json({
				message: 'Password changed successfully',
				data: result,
			});
		} catch (error) {
			return res.status(error.status || 500).json({
				message: error.message || 'Failed to change password',
			});
		}
	},
};

export default authController;
