import { Router } from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/users', UserController.createUser);
router.get('/users/:id', authMiddleware, UserController.getUser);
router.get('/users/email/:email', authMiddleware, UserController.getUserByEmail);

router.get('/error', (req, res) => {
    throw new Error('This is a test error!');
});

export default router;
