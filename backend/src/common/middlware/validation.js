import { logError } from '../utils/logger.js';

// Middleware to validate request data
export const validate = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body, {
			abortEarly: false, // returns all errors, not just the first one
			stripUnknown: true, // removes unknown keys from the validated data
		});

		if (error) {
			const errorMessage = error.details
				.map((detail) => detail.message)
				.join(', ');
			logError('Validation error:', { error: errorMessage, path: req.path });
			return res.status(400).json({
				message: 'Validation failed',
				errors: error.details.map((detail) => ({
					field: detail.path.join('.'),
					message: detail.message,
				})),
			});
		}

		next();
	};
};
