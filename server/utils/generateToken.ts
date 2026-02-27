import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateToken = (res: Response, userId: Types.ObjectId) => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign({ userId }, secret, {
    expiresIn: '7d',
  });

  // JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', 
    sameSite: 'strict', 
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;