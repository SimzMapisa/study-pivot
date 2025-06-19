import { it } from '@jest/globals';
import { mockDeep } from 'jest-mock-extended';
import prisma from '../../../common/config/db.js';
import friendshipServices from '../services.js';
const {
	createFriendship,
	getFriendshipStatus,
	cancelFriendshipRequest,
	acceptFriendship,
	unfriend,
} = friendshipServices;

jest.mock('../../../common/config/db.js', () => ({
	__esModule: true,
	default: mockDeep(),
}));

describe('Friendship Services', () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});
	describe('createFriendship', () => {
		it('should create a friendship successfully', async () => {
			const senderId = 'user1';
			const receiverId = 'user2';
			const expectedResponse = {
				success: true,
				message: 'Friendship requested successfully',
			};

			// Mock a request object as your service expects
			const mockRequest = {
				user: { id: senderId },
				body: { receiverId: receiverId },
			};
			prisma.user.findUnique.mockResolvedValueOnce({ id: receiverId });
			prisma.user.findUnique.mockResolvedValueOnce({ id: senderId });
			prisma.friendship.findFirst.mockResolvedValue(null);
			prisma.friendship.create.mockResolvedValue({
				id: 'friendship1',
				senderId,
				receiverId: receiverId,
			});

			const response = await createFriendship(mockRequest);
			expect(response).toEqual(expectedResponse);
		});

		it('should return the correct friendship status', async () => {
			const userId = 'user1';
			const friendId = 'user2';
			const expectedStatus = 'friends';
			prisma.user.findUnique.mockResolvedValueOnce({ id: userId });
			prisma.user.findUnique.mockResolvedValueOnce({ id: friendId });
			prisma.friendship.findFirst.mockResolvedValueOnce({
				senderId: userId,
				receiverId: friendId,
				status: expectedStatus,
			});

			const status = await getFriendshipStatus(userId, friendId);

			expect(status).toBe(expectedStatus);
		});
		it('should throw an error when userId is invalid', async () => {
			const invalidUserId = 'invalidUser';
			const friendId = 'user2';

			prisma.user.findUnique.mockResolvedValueOnce(null);

			await expect(
				getFriendshipStatus(invalidUserId, friendId)
			).rejects.toThrow('Invalid user ID');
		});
		it('should return a message when friendship already exists', async () => {
			const senderId = 'user1';
			const receiverId = 'user2';
			const expectedResponse = {
				success: false,
				message: 'Friendship already exists',
			};

			const mockRequest = {
				user: { id: senderId },
				body: { receiverId: receiverId },
			};

			prisma.user.findUnique.mockResolvedValueOnce({ id: senderId });
			prisma.user.findUnique.mockResolvedValueOnce({ id: receiverId });
			prisma.friendship.findFirst.mockResolvedValueOnce({
				senderId,
				receiverId,
			});

			const response = await createFriendship(mockRequest);
			expect(response).toEqual(expectedResponse);
		});
	});
	describe('getFriendshipStatus', () => {
		it('should return "not friends" when no friendship exists', async () => {
			const userId = 'user1';
			const friendId = 'user2';

			prisma.user.findUnique.mockResolvedValueOnce({ id: userId });
			prisma.user.findUnique.mockResolvedValueOnce({ id: friendId });
			prisma.friendship.findFirst.mockResolvedValueOnce(null);

			const status = await friendshipServices.getFriendshipStatus(
				userId,
				friendId
			);
			expect(status).toBe('not friends');
		});

		it('should return "requested" when user has sent a request', async () => {
			const userId = 'user1';
			const friendId = 'user2';

			prisma.user.findUnique.mockResolvedValueOnce({ id: userId });
			prisma.user.findUnique.mockResolvedValueOnce({ id: friendId });
			prisma.friendship.findFirst.mockResolvedValueOnce({
				senderId: userId,
				receiverId: friendId,
				status: 'pending',
			});

			const status = await friendshipServices.getFriendshipStatus(
				userId,
				friendId
			);
			expect(status).toBe('requested');
		});

		it('should return "friends" when friendship is established', async () => {
			const userId = 'user1';
			const friendId = 'user2';

			prisma.user.findUnique.mockResolvedValueOnce({ id: userId });
			prisma.user.findUnique.mockResolvedValueOnce({ id: friendId });
			prisma.friendship.findFirst.mockResolvedValueOnce({
				senderId: friendId, // Note: Sender is the friend here
				receiverId: userId,
				status: 'accepted',
			});

			const status = await friendshipServices.getFriendshipStatus(
				userId,
				friendId
			);
			expect(status).toBe('friends');
		});

		it('should throw error when userId is invalid', async () => {
			const invalidUserId = 'invalidUser';
			const friendId = 'user2';

			prisma.user.findUnique.mockResolvedValueOnce(null);

			await expect(
				friendshipServices.getFriendshipStatus(invalidUserId, friendId)
			).rejects.toThrow('Invalid user ID');
		});

		it('should throw error when friendId is invalid', async () => {
			const userId = 'user1';
			const invalidFriendId = 'invalidFriend';

			prisma.user.findUnique.mockResolvedValueOnce({ id: userId });
			prisma.user.findUnique.mockResolvedValueOnce(null);

			await expect(
				friendshipServices.getFriendshipStatus(userId, invalidFriendId)
			).rejects.toThrow('Invalid user ID');
		});
	});
	describe('acceptFriendshipRequest', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should accept a friendship request successfully', async () => {
			const userId = 'user1'; // This is the receiver
			const senderId = 'user2'; // This is the sender
			const expectedResponse = {
				success: true,
				message: 'Friendship request accepted',
			};

			const mockRequest = {
				user: { id: userId },
				body: { senderId: senderId }, // Changed from friendId to senderId
			};

			prisma.friendship.findFirst.mockResolvedValueOnce({
				id: 'friendship1',
				senderId,
				receiverId: userId,
				status: 'pending',
			});

			prisma.friendship.update.mockResolvedValueOnce({
				id: 'friendship1',
				senderId,
				receiverId: userId,
				status: 'accepted',
			});

			const response = await acceptFriendship(mockRequest);
			expect(response).toEqual(expectedResponse);
		});
		it('should throw error when friendship request not found', async () => {
			const userId = 'user1';
			const senderId = 'user2'; // Changed from friendId to senderId

			const mockRequest = {
				user: { id: userId },
				body: { senderId: senderId }, // Changed from friendId to senderId
			};

			prisma.friendship.findFirst.mockResolvedValueOnce(null);

			await expect(acceptFriendship(mockRequest)).rejects.toThrow(
				'Friendship request not found'
			);
		});
	});
	describe('cancelFriendshipRequest', () => {
		it('should cancel friendship successfully', async () => {
			const senderId = 'user1';
			const receiverId = 'user2';
			const expectedResponse = {
				success: true,
				message: 'Friendship request cancelled',
			};

			const mockRequest = {
				user: { id: senderId },
				body: { receiverId: receiverId },
			};

			prisma.friendship.findFirst.mockResolvedValueOnce({
				id: 'friendship1',
				senderId,
				receiverId,
				status: 'pending',
			});

			prisma.friendship.delete.mockResolvedValueOnce({
				id: 'friendship1',
				senderId,
				receiverId,
			});

			const response = await cancelFriendshipRequest(mockRequest);
			expect(response).toEqual(expectedResponse);
		});
		it('should throw error when trying to cancel a non-existent friendship', async () => {
			const senderId = 'user1';
			const receiverId = 'user2';

			const mockRequest = {
				user: { id: senderId },
				body: { receiverId: receiverId },
			};

			prisma.friendship.findFirst.mockResolvedValueOnce(null);

			await expect(cancelFriendshipRequest(mockRequest)).rejects.toThrow(
				'Friendship request not found'
			);
		});
		it('should throw error when trying to cancel a friendship that is not pending', async () => {
			const senderId = 'user1';
			const receiverId = 'user2';

			const mockRequest = {
				user: { id: senderId },
				body: { receiverId: receiverId },
			};

			prisma.friendship.findFirst.mockResolvedValueOnce({
				id: 'friendship1',
				senderId,
				receiverId,
				status: 'accepted',
			});

			await expect(cancelFriendshipRequest(mockRequest)).rejects.toThrow(
				'Friendship request is not pending'
			);
		});
	});
	describe('unfriend a user', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should throw error when user is not logged in', async () => {
			const userId = 'user1';
			const friendId = 'user2';

			const mockRequest = {
				user: { id: userId },
				body: { receiverId: friendId },
			};

			prisma.user.findUnique.mockResolvedValueOnce(null);

			await expect(unfriend(mockRequest)).rejects.toThrow(
				'Please login to continue'
			);
		});
		it('should throw an error when friendId is invalid', async () => {
			const userId = 'user1';
			const friendId = 'invalidFriend';

			const mockRequest = {
				user: { id: userId },
				body: { receiverId: friendId },
			};

			prisma.user.findUnique.mockResolvedValueOnce({ id: userId });
			prisma.user.findUnique.mockResolvedValueOnce(null);

			await expect(unfriend(mockRequest)).rejects.toThrow(
				'Please provide a valid friend ID'
			);
		});

		it('should throw an error when friendship not found', async () => {
			const userId = 'user1';
			const friendId = 'user2';
			const mockRequest = {
				user: { id: userId },
				body: { friendId: friendId },
			};

			prisma.friendship.findFirst.mockResolvedValueOnce(null);
			await expect(unfriend(mockRequest)).rejects.toThrow(
				'Friendship not found'
			);
		});
		it('should throw an error when trying to unfriend a user that is not accepted', async () => {
			const userId = 'user1';
			const friendId = 'user2';
			const mockRequest = {
				user: { id: userId },
				body: { friendId: friendId },
			};
			prisma.friendship.findFirst.mockResolvedValueOnce({
				senderId: userId,
				receiverId: friendId,
				status: 'pending',
			});

			await expect(unfriend(mockRequest)).rejects.toThrow(
				'You can only unfriend accepted friendships'
			);
		});
		it('should unfriend successfully', async () => {
			const userId = 'user1';
			const friendId = 'user2';

			const mockRequest = {
				user: { id: userId },
				body: { friendId: friendId },
			};

			prisma.user.findUnique.mockResolvedValueOnce({ id: userId });
			prisma.user.findUnique.mockResolvedValueOnce({ id: friendId });

			prisma.friendship.findFirst.mockResolvedValueOnce({
				id: 'friendship1',
				senderId: userId,
				receiverId: friendId,
				status: 'accepted',
			});

			prisma.friendship.delete.mockResolvedValueOnce({
				id: 'friendship1',
				senderId: userId,
				receiverId: friendId,
			});

			const response = await friendshipServices.unfriend(mockRequest);
			expect(response).toEqual({
				success: true,
				message: 'Unfriended successfully',
			});
		});
	});
});
