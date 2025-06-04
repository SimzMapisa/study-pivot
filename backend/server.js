import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './src/routes/user/index.js';

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use('/', userRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
