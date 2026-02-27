import jwt, {type JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import  User, {type IUser } from '../models/User.js';

// 1. Extend the Express Request interface to include our User
export interface AuthRequest extends Request {
  user?: IUser | null;
}

// 2. The Protection Middleware
export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  // Check if the jwt cookie exists on the request
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    try {
      // Verify the token using secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      // Fetch the user from the database (excluding the password) and attach to req
      req.user = await User.findById(decoded.userId).select('-password');

      // Move on to the next middleware or controller
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token provided' });
  }
};