import userServices from './services.js';

const userController = {
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
