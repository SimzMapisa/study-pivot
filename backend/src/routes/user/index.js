import express from 'express';
import passport from 'passport';
import userController from '../../controllers/user.js';
import { isAuthenticated } from '../../middlware/auth.js';

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/users', isAuthenticated, userController.getUsers);
router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(500).json({ message: 'Internal server error' });
		}
		if (!user) {
			return res
				.status(401)
				.json({ message: info.message || 'Authentication failed' });
		}
		req.logIn(user, (err) => {
			if (err) {
				return res.status(500).json({ message: 'Error logging in' });
			}
			return res.status(200).json({
				message: 'Login successful',
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
				},
			});
		});
	})(req, res, next);
});

export default router;
