import express from 'express';
const router = express.Router();
import { signup, login, logout, verifyEmail } from '../controllers/auth.js';

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);
export default router;

//to verify the email
router.post('/verify-email', verifyEmail);
