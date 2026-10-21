import express from 'express';
import { login, getMe, logout } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', protectAdmin, getMe);
router.post('/logout', logout);

export default router;
