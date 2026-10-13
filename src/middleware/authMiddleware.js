import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendError } from '../utils/apiResponse.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Not authorized. No token provided.', 401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'portfolio_jwt_secret_key_change_in_production_123456'
    );
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return sendError(res, 'User not found. Token is invalid.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Not authorized. Invalid or expired token.', 401);
  }
};
