// Aggregates all the routes for the API
import { Router } from 'express';
import authRoutes from '../features/auth/routes.js';
import profileRoutes from '../features/profile/routes.js';
import userRoutes from '../features/user/routes.js';

const router = Router();

// Mount user routes
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);

export default router;
