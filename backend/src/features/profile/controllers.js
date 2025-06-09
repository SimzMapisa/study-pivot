import profileServices from './services.js';

const profileControllers = {
	getProfile: async (req, res) => {
		try {
			const profile = await profileServices.getProfile(req);
			res.status(200).json(profile);
		} catch (error) {
			console.error('Error fetching profile:', error);
			res
				.status(error.status || 500)
				.json({ message: error.message || 'Internal Server Error' });
		}
	},
};

export default profileControllers;
