import { clerkClient, getAuth, requireAuth } from '@clerk/express';
import express from 'express';
import logger from '../../logger.js';
import { Friend, User } from '../../models/user.js';

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
			avatar: response.imageUrl,
			profilecompleted: true,
			...req.body,
		};
		await User.create(newUser);
		return res.status(201).json({ message: 'User created', newUser });
	} catch (error) {
		return res.status(500).json({ message: 'Registration failed' });
	}
});

// Middleware to check friendship status between the authenticated user and other users
const checkFriendshipStatus = async (req, res, next) => {
	const auth = getAuth(req); // Get the authenticated user's ID
	const users = res.locals.users; // Assume users are stored in res.locals by the previous middleware or route handler

	const clerkUser = await clerkClient.users.getUser(auth.userId);
	const email = clerkUser.emailAddresses[0].emailAddress;

	const user = await User.findOne({ email });

	const userId = user._id.toString();

	try {
		// Fetch all friendships involving the current user
		const friendships = await Friend.find({
			$or: [{ user: userId }, { friend: userId }],
		});

		// Map users to include their friendship status
		const usersWithStatus = users.map((user) => {
			const friendship = friendships.find(
				(f) =>
					(f.user.toString() === userId &&
						f.friend.toString() === user._id.toString()) ||
					(f.friend.toString() === userId &&
						f.user.toString() === user._id.toString())
			);

			return {
				...user.toObject(), // Convert Mongoose document to plain object
				friendshipStatus: friendship ? friendship.status : 'not_friends',
			};
		});

		res.locals.usersWithStatus = usersWithStatus; // Store enriched data in res.locals
		next(); // Proceed to the next middleware/route handler
	} catch (error) {
		console.error('Error fetching friendship status:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

router.get(
	'/users',
	async (req, res, next) => {
		logger.info('Getting all users');
		try {
			const { userId } = getAuth(req);
			const response = await clerkClient.users.getUser(userId);
			const email = response.emailAddresses[0].emailAddress;

			// Fetch all users except the current user
			const users = await User.find({ email: { $ne: email } });

			// Store users in res.locals for the next middleware
			res.locals.users = users;
			next();
		} catch (error) {
			console.error('Database error:', error);
			res.status(500).json({ message: 'Internal server error' });
		}
	},
	checkFriendshipStatus,
	(req, res) => {
		return res.status(200).json(res.locals.usersWithStatus);
	}
);

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

// friend request
router.post('/add-friend/:id', async (req, res) => {
	const friendId = req.params.id;
	const email = req.body.email;
	console.log(friendId, email);
	try {
		const friend = await User.findById(req.params.id);
		const user = await User.findOne({ email });
		const userId = user._id.toString();
		if (!user || !friend) {
			return res.status(404).json({ message: 'User not found' });
		}
		const existingFriendship = await Friend.findOne({
			$or: [
				{ user: userId, friend: friendId },
				{ user: friendId, friend: userId },
			],
		});
		if (existingFriendship) {
			return res.status(400).json({ message: 'Friendship already exists' });
		}
		const newFriendship = new Friend({
			user: userId,
			friend: friendId,
			status: 'accepted',
		});
		await newFriendship.save();
		res.status(201).json({ message: 'Friend request sent successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error', error });
	}
});

export default router;
