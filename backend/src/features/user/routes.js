import express from 'express';
import { ROLES } from '../../common/config/roles.js';
import { allowedRoles, isAuthenticated } from '../../common/middlware/auth.js';
import { validate } from '../../common/middlware/validation.js';
import { getProfileSchema } from '../../common/validation/schemas/profile.js';
import { createUserSchema } from '../../common/validation/schemas/user.js';
import userController from './controllers.js';

const router = express.Router();

router.post(
	'/create',
	validate(createUserSchema),
	(req, res, next) => {
		const schema = getProfileSchema(req.body.role);
		validate(schema)(req, res, next);
	},
	userController.createUser
);
router.get('/users', isAuthenticated, userController.getUsers);

router.get(
	'/students',
	isAuthenticated,
	allowedRoles(ROLES.STUDENT, ROLES.ADMIN, ROLES.TUTOR),
	userController.getStudents
);

export default router;
