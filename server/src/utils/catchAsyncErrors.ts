import type { Request, Response, NextFunction } from 'express';

export const catchAsyncError = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(err => next(err));
  };
};
