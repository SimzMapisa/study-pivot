import { Router } from 'express';
import profileControllers from './controllers.js';

const router = Router();

router.get('/myprofile', profileControllers.getProfile);

export default router;
