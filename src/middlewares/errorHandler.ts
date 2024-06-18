import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error: %o', err);

  res.status(500).json({
    error: err.message,
  });
};

export default errorHandler;
