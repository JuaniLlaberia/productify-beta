import type { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/emailTemplates/error';

interface CustomErrorType extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  code?: number;
}

export const errorHandler = (
  err: CustomErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status;

  let error = { ...err };
  error.message = err.message;

  switch (err.name) {
    case 'CastError':
      error = new CustomError('ID not found in database.', 404);
      break;
    case 'ValidationError':
      error = new CustomError('Invalid fields.', 400);
      break;
    case 'JsonWebTokenError':
      error = new CustomError('Invalid token. Log in again.', 401);
      break;
    case 'TokenExpiredError':
      error = new CustomError('Token has expired. Log in again.', 401);
      break;
  }

  if (error.code === 11000)
    error = new CustomError(
      'Duplicate fields. Try with different values.',
      500
    );

  res
    .status(error.statusCode)
    .json({ status: error.status, message: error.message });
};
