import { Router } from 'express';
import { validate } from '../../common/middlware/validation.js';
import {
	changePasswordSchema,
	confirmResetPasswordSchema,
	loginSchema,
	resetPasswordSchema,
} from '../../common/validation/schemas/auth.js';
import authController from './controllers.js';

const router = Router();

router.post('/login', validate(loginSchema), authController.login);
router.delete('/logout', authController.logout);
router.get('/status', authController.checkAuthStatus);
router.post(
	'/reset-password',
	validate(resetPasswordSchema),
	authController.resetPassword
);
router.post(
	'/reset-password/confirm',
	validate(confirmResetPasswordSchema),
	authController.confirmResetPassword
);
router.post(
	'/change-password',
	validate(changePasswordSchema),
	authController.changePassword
);

export default router;
