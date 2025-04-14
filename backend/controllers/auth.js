import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndCookie } from '../utils/generateTokenAndCookie.js';

export const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
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
      resetPasswordExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });
    await user.save();

    //authenticate: creating the token and sending it to the user
    generateTokenAndCookie(res, user._id);
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

export const login = (req, res, next) => {
  res.send('login');
};

export const logout = (req, res, next) => {
  res.send('logout');
};
