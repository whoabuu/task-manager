import express from 'express';
import { registerUser, loginUser, logoutUser, getMe } from '../controllers/authController.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);

export default router;