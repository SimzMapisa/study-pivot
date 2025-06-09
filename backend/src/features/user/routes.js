import express from 'express';
import { ROLES } from '../../common/config/roles.js';
import { allowedRoles, isAuthenticated } from '../../common/middlware/auth.js';
import userController from './controllers.js';

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/users', isAuthenticated, userController.getUsers);

router.get(
	'/students',
	isAuthenticated,
	allowedRoles(ROLES.STUDENT, ROLES.ADMIN, ROLES.TUTOR),
	userController.getStudents
);

export default router;
