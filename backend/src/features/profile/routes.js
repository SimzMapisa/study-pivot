import { Router } from 'express';
import { isAuthenticated } from '../../common/middlware/auth.js';
import profileControllers from './controllers.js';

const router = Router();

router.get('/myprofile', isAuthenticated, profileControllers.getProfile);

export default router;
