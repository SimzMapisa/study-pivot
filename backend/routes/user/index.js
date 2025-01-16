import express from 'express';
import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import { clerkClient, getAuth, requireAuth } from '@clerk/express';

const salt = 10;

const router = express.Router();

router.get('/', requireAuth(), async (req, res) => {
	const { userId } = getAuth(req);

	const response = await clerkClient.users.getUser(userId);
	// console.log(response.emailAddresses[0].emailAddress);

	const user = await User.findOne({
		email: response.emailAddresses[0].emailAddress,
	});

	console.log(user);
	if (user) {
		return res.json({ message: 'User found', user });
	}

	if (!user) {
		const newUser = new User({
			name: response.fullName,
			email: response.emailAddresses[0].emailAddress,
		});
		await newUser.save();
		return res.status(200).json(newUser);
	}
});

router.post('/register', async (req, res) => {
	const { name, email, password } = req.body;
	const userExists = await User.findOne({ email });
	if (userExists) {
		return res.status(403).json({
			error: 'Email is taken',
		});
	}

	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = new User({ name, email, password: hashedPassword });
	await newUser.save();
	return res.status(200).json({ message: 'Register success! Please login.' });
});

export default router;
