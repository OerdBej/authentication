import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndCookie } from '../utils/generateTokenAndCookie.js';
import {
  sendVerificationEmail,
  sendWelcomeEmail,
} from '../mailtrap/verification_emails.js';

const validatePassword = (password) => {
  const minLength = 5;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return 'Password must be at least 5 characters long';
  }
  if (!hasUpperCase) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!hasSpecialChar) {
    return 'Password must contain at least one special character';
  }
  return null;
};

export const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ success: false, message: passwordError });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error('User already exists');
    }

    //hash the password and create the new user
    const hashPassword = await bcrypt.hash(password, 10);
    //🔴 veification token like User model and save it to database
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      email,
      password: hashPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
    });
    await user.save();

    //authenticate: creating the token and sending it to the user
    generateTokenAndCookie(res, user._id);

    //send verification email 🔴
    await sendVerificationEmail(user, verificationToken);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  console.log('Received request body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);

  //the code of the sent email from user
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Verification code is required',
      receivedBody: req.body,
    });
  }

  try {
    console.log('Searching for user with verification code:', code);
    console.log('Current time:', Date.now());

    //find the user by verification token but also with expiration date
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    //if the user is not found or the code is invalid
    if (!user) {
      console.log(
        'No user found with this verification code or code has expired'
      );
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code',
      });
    }

    console.log('User found:', user.email);

    //if the user is verified we delete the verification token because it is no longer needed
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    //send welcome email
    await sendWelcomeEmail(user.email, user.name);

    res
      .status(200)
      .json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
      details: 'An error occurred during email verification',
    });
  }
};

export const login = (req, res, next) => {
  res.send('login');
};

export const logout = (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logout successful' });
};
