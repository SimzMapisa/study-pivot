import express from 'express';
import userController from '../../controllers/user.js';

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/login', userController.login);

export default router;
