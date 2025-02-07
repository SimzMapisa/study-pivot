import { clerkMiddleware } from '@clerk/express';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user/index.js';

import cors from 'cors';
import morgan from 'morgan';
import logger from './logger.js';
const morganFormat = ':method :url :status :response-time ms';

// configure dotenv
dotenv.config();

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};
const app = express();

connectDB();

// Middleware
app.use(clerkMiddleware());
app.use(
	morgan(morganFormat, {
		stream: {
			write: (message) => {
				const logObject = {
					method: message.split(' ')[0],
					url: message.split(' ')[1],
					status: message.split(' ')[2],
					responseTime: message.split(' ')[3],
				};
				logger.info(JSON.stringify(logObject));
			},
		},
	})
);
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/v1', userRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
