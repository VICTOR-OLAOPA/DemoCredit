import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // In real implementation, you should verify the token properly here
  const expectedToken = process.env.SECRET_KEY;

  if (token === expectedToken) {
    next();
  } else {
    return res.status(401).json({ error: 'Failed to authenticate token' });
  }
};

export default authMiddleware;