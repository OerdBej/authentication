import express from 'express';
const router = express.Router();
import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.js';

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

//to verify the email
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
