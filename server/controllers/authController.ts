import type { Request, Response } from 'express';
import User from '../models/User.ts';
import generateToken from '../utils/generateToken.ts';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Please provide all required fields' });
      return;
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    // Create user
    const user = await User.create({ name, email, password });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Server error during registration', details: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Please provide email and password' });
      return;
    }

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Server error during login', details: error.message });
  }
};

export const logoutUser = (req: Request, res: Response): void => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  
  res.status(200).json({ message: 'Logged out successfully' });
};