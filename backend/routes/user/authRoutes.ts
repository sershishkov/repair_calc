import express from 'express';
const router = express.Router();

import {
  register,
  login,
  logout,
  getMe,
} from '../../controllers/user/authController';
import { protect } from '../../middlewares/authMiddleware';

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);

export default router;
