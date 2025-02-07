import { clerkClient, getAuth, requireAuth } from '@clerk/express';
import express from 'express';
import logger from '../../logger.js';
import User from '../../models/user.js';

const salt = 10;

const router = express.Router();

router.get('/all', requireAuth(), async (req, res) => {
	// Get all users
	res.json({ message: 'All users' });
});

router.post('/register', async (req, res) => {
	try {
		const { userId } = getAuth(req);
		const response = await clerkClient.users.getUser(userId);
		const email = response.emailAddresses[0].emailAddress;
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(403).json({
				message: 'Profile is up to date',
			});
		}
		const newUser = {
			name: response.firstName,
			surname: response.lastName,
			username: response.username,
			email,
			profilecompleted: true,
			...req.body,
		};
		await User.create(newUser);
		return res.status(201).json({ message: 'User created', newUser });
	} catch (error) {
		return res.status(500).json({ message: 'Registration failed' });
	}
});

router.get('/users', async (req, res) => {
	logger.info('Getting all users');
	const users = await User.find();
	return res.status(200).json(users);
});

router.get('/users/:email', async (req, res) => {
	try {
		console.log('Received request for email:', req.params.email);
		const user = await User.findOne({ email: req.params.email });
		console.log('Found user:', user);

		if (!user || user === null) {
			return res.status(404).json({ message: 'User not found!!!' });
		}

		return res.status(200).json({
			...user.toObject(),
			profilecompleted: user.profilecompleted,
		});
	} catch (error) {
		console.error('Database error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

export default router;
