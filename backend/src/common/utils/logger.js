import winston from 'winston';

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error',
		}),
		new winston.transports.File({
			filename: 'logs/combined.log',
		}),
	],
});

// Add console transport for non-production environments
if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			),
		})
	);
}

// Helper functions for common log levels
export const logInfo = (message, meta = {}) => {
	logger.info(message, meta);
};

export const logError = (message, meta = {}) => {
	logger.error(message, meta);
};

export const logWarn = (message, meta = {}) => {
	logger.warn(message, meta);
};

export default logger;
