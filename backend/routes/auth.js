import express from 'express';
const router = express.Router();
import { signup, login, logout, verifyEmail } from '../controllers/auth.js';

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

//to verify the email
router.post('/verify-email', verifyEmail);

export default router;
