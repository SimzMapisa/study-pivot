import { logError } from './logger.js';

export class AppError extends Error {
	constructor(message, statusCode, details = null) {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
		this.isOperational = true; // Indicates if this is an expected error

		Error.captureStackTrace(this, this.constructor);
	}
}

export const handleError = (err, req, res, next) => {
	// Default error values
	let statusCode = err.statusCode || 500;
	let message = err.message || 'Something went wrong';
	let details = err.details || null;

	// Handle Joi validation errors
	if (err.isJoi) {
		statusCode = 400;
		message = 'Validation failed';
		details = err.details.map((detail) => ({
			field: detail.path.join('.'),
			message: detail.message,
		}));
	}

	// Log all errors except validation errors (which we already log in validation middleware)
	if (!err.isJoi) {
		logError(`Error: ${message}`, {
			statusCode,
			path: req.path,
			method: req.method,
			details: err.details || err.stack,
		});
	}

	// Send response
	res.status(statusCode).json({
		status: 'error',
		message,
		details,
		...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
	});
};
