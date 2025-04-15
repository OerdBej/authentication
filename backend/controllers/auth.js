import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndCookie } from '../utils/generateTokenAndCookie.js';
import { sendVerificationEmail } from '../mailtrap/verification_emails.js';

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

    //send verification email
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

export const verifyEmail = async (req, res, next) => {
  //the code of the sent email
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    //if the user is not found or the code is invalid
    if (!user) {
      throw new Error('Invalid verification code');
    }

    //if the user is verified we delete the verification token because it is no longer needed
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: 'Email verified successfully' });
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
