import { Router } from 'express';
import authController from './controllers.js';

const router = Router();

router.post('/login', authController.login);
router.delete('/logout', authController.logout);
router.get('/status', authController.checkAuthStatus);
router.post('/reset-password', authController.resetPassword);
router.post('/reset-password/confirm', authController.confirmResetPassword);
router.post('/change-password', authController.changePassword);

export default router;
