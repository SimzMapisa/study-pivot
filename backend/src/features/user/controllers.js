import userServices from './services.js';

/**
 * User controller for handling user-related requests.
 * This module contains functions to create users and fetch user lists.
 *
 * @module userController
 * @requires userServices
 */

const userController = {
	/**
	 * Creates a new user with the provided details.
	 * Validates the request body for required fields.
	 * If validation fails, it returns a 400 status with an error message.
	 * If the user is created successfully, it returns a 201 status with the user data.
	 *
	 * @param {Object} req - The request object containing user details in the body.
	 * @param {Object} res - The response object used to send the response.
	 * @param {Function} next - The next middleware function in the stack.
	 * @returns {Promise<void>} Returns a response with the created user or an error message.
	 */

	createUser: async (req, res, next) => {
		const { name, surname, email, password, role } = req.body;

		if (!name || !surname || !email || !password || !role) {
			return res.status(400).json({ error: 'Name and email are required' });
		} else {
			const user = await userServices.createUser(
				name,
				surname,
				email,
				password,
				role
			);
			res.status(201).json(user);
			next();
		}
	},

	getUsers: async (req, res, next) => {
		const users = await userServices.getUsers();
		users.length === 0 ? res.status(200).json([]) : res.status(200).json(users);
		next();
	},

	getStudents: async (req, res, next) => {
		const students = await userServices.getStudents();
		students.length === 0
			? res.status(200).json([])
			: res.status(200).json(students);
		next();
	},
};

export default userController;
