import userServices from '../services/user.js';

const userController = {
	createUser: async (req, res, next) => {
		const { name, email, password } = req.body;

		if (!name || !email) {
			return res.status(400).json({ error: 'Name and email are required' });
		} else {
			const user = await userServices.createUser(name, email, password);
			res.status(201).json(user);
			next();
		}
	},

	getUsers: async (req, res, next) => {
		const users = await userServices.getUsers();
		if (users.length === 0) {
			return res.status(200).json({});
		} else {
			res.status(200).json(users);
			next();
		}
	},

	login: async (req, res, next) => {
		const { email, password } = req.body;

		const user = await userServices.login(email, password);

		if (user.error) {
			return res.status(400).json({ error: user.error });
		}
		res.status(200).json(user);
		next();
	},
};

export default userController;
