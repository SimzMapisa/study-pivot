import prisma from '../../common/config/db';

const friendshipServices = {
	createFriendship: async (req) => {
		const sender = req.user;
		const { receiverId } = req.body;

		const receiverExist = await prisma.user.findUnique({
			where: { id: receiverId },
		});

		const senderExist = await prisma.user.findUnique({
			where: { id: sender.id },
		});

		if (!senderExist && senderExist !== null) {
			return { success: false, message: 'Please login to continue' };
		}

		if (!receiverExist && receiverExist !== null) {
			return { success: false, message: 'User not found' };
		}
		// Check if the friendship already exists
		const existingFriendship = await prisma.friendship.findFirst({
			where: {
				OR: [
					{ senderId: sender.id, receiverId },
					{ senderId: receiverId, receiverId: sender.id }, // Fixed property name
				],
			},
		});

		if (existingFriendship) {
			return { success: false, message: 'Friendship already exists' };
		}

		// Create a new friendship
		await prisma.friendship.create({
			data: {
				senderId: sender.id,
				receiverId,
			},
		});

		return { success: true, message: 'Friendship requested successfully' };
	},

	getFriendshipStatus: async (userId, friendId) => {
		if (!userId || !friendId) {
			throw new Error('Invalid user ID');
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
		});
		const friend = await prisma.user.findUnique({
			where: { id: friendId },
		});

		if (!user || !friend) {
			throw new Error('Invalid user ID');
		}

		const friendship = await prisma.friendship.findFirst({
			where: {
				OR: [
					{ senderId: userId, receiverId: friendId },
					{ senderId: friendId, receiverId: userId },
				],
			},
		});

		if (!friendship) {
			return 'not friends';
		}

		// If the friendship status is 'accepted', they are friends regardless of who sent it
		if (friendship.status === 'accepted') {
			return 'friends';
		}

		// If current user is the sender and status is pending, they've requested friendship
		if (
			friendship.senderId === userId &&
			friendship.receiverId === friendId &&
			friendship.status === 'pending'
		) {
			return 'requested';
		}

		// If current user is the receiver and status is pending, they've received a request
		if (
			friendship.senderId === friendId &&
			friendship.receiverId === userId &&
			friendship.status === 'pending'
		) {
			return 'pending';
		}

		return 'friends';
	},

	acceptFriendship: async (req) => {
		const user = req.user;
		const { senderId } = req.body;

		const friendship = await prisma.friendship.findFirst({
			where: {
				senderId,
				receiverId: user.id,
				status: 'pending',
			},
		});
		if (!friendship) {
			throw new Error('Friendship request not found');
		}
		if (friendship.status !== 'pending') {
			throw new Error('Friendship request is no longer valid');
		}
		// Update the friendship status to accepted
		await prisma.friendship.update({
			where: { id: friendship.id },
			data: { status: 'accepted' },
		});

		return { success: true, message: 'Friendship request accepted' };
	},

	cancelFriendshipRequest: async (req) => {
		const user = req.user;
		const { receiverId } = req.body;

		const friendship = await prisma.friendship.findFirst({
			where: {
				senderId: user.id,
				receiverId,
				status: 'pending',
			},
		});
		if (!friendship) {
			// return { success: false, message: 'Friendship request not found' };
			throw new Error('Friendship request not found');
		}
		if (friendship.status !== 'pending') {
			throw new Error('Friendship request is not pending');
		}

		// Delete the friendship request
		await prisma.friendship.delete({
			where: { id: friendship.id },
		});

		return { success: true, message: 'Friendship request cancelled' };
	},

	unfriend: async (req) => {
		const user = req.user;
		const { friendId } = req.body;

		const userExist = await prisma.user.findUnique({
			where: { id: user.id },
		});
		const friend = await prisma.user.findUnique({
			where: { id: friendId },
		});

		if (userExist === null) {
			throw new Error('Please login to continue');
		}

		if (friend === null) {
			throw new Error('Please provide a valid friend ID');
		}

		const friendship = await prisma.friendship.findFirst({
			where: {
				OR: [
					{ senderId: user.id, receiverId: friendId },
					{ senderId: friendId, receiverId: user.id },
				],
			},
		});
		if (friendship === null) {
			throw new Error('Friendship not found');
		}

		if (friendship.status !== 'accepted') {
			throw new Error('You can only unfriend accepted friendships');
		}

		await prisma.friendship.delete({
			where: { id: friendship.id, status: 'accepted' },
		});

		return { success: true, message: 'Unfriended successfully' };
	},
};

export default friendshipServices;
