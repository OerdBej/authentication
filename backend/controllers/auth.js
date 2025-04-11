import User from '../models/User.js';

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
  } catch (error) {
    next(error);
  }
};

export const login = (req, res, next) => {
  res.send('login');
};

export const logout = (req, res, next) => {
  res.send('logout');
};
