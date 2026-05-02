import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    // Verify token — no fallback secret, require env var
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token (exclude password)
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.status(401);
      throw new Error('Not authorized, user not found');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401);
      throw new Error('Token expired, please login again');
    }
    if (error.name === 'JsonWebTokenError') {
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
    // Re-throw if it's already been handled (status already set)
    throw error;
  }
});
