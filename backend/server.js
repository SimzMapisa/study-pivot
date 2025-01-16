import express from 'express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user/index.js';
import { clerkMiddleware } from '@clerk/express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// configure dotenv

app.use(clerkMiddleware());

connectDB();

app.use(express.json());

app.use('/api/v1', userRoutes);

app.listen(5000, () => {
	console.log('Server running on port 5000');
});
