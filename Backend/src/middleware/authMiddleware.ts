import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../Model/User';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

// Middleware to validate signup data
export const validateSignup = (req: Request, res: Response, next: NextFunction): any => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required for registration.' });
  }

  next();
};

// Middleware to validate login data
export const validateLogin = (req: Request, res: Response, next: NextFunction): any => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  next();
};

export interface AuthenticatedRequestdata extends Request {
  user: {
    id: string;
    role: string;
  };
}

// Middleware to protect routes
export const protect = async (
  req: AuthenticatedRequest, 
  res: Response,
  next: NextFunction
): Promise<any> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: string };

    const user = await User.findById(decoded.id).select('id role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Admin middleware to check if user has 'admin' role
export const admin = (
  req: AuthenticatedRequest, 
  res: Response,
  next: NextFunction
): any => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};
