//here to create a json web token and send it as a cookie
import jwt from 'jsonwebtoken';

export const generateTokenAndCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', //csrf protection
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  });
  return token;
};
