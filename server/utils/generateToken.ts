import type { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (res: Response, userId: any): void => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    // Use secure cookies in production (HTTPS)
    secure: process.env.NODE_ENV === 'production',
    // Allow cross-domain cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, 
  });
};

export default generateToken;