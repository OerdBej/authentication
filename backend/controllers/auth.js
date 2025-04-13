import User from '../models/User.js';
import bcrypt from 'bcryptjs';

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
    const verificationToken = generateVerificationToken();
    const user = await User.create({
      email,
      password: hashPassword,
      name,
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
