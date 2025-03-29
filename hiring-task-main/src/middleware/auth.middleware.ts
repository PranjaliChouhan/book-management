import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader);
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.log('No token found in authorization header');
      return res.status(401).json({ message: 'Authentication required' });
    }

    console.log('JWT Secret:', process.env.JWT_SECRET?.substring(0, 3) + '...');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      console.log('Token decoded successfully:', decoded);
      
      // Verify user exists in database
      const userId = parseInt(decoded.userId);
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user) {
        console.log('User not found:', userId);
        return res.status(401).json({ message: 'User not found' });
      }
      
      req.user = decoded;
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}; 