import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/emailTemplates/error';

export const validateBody =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (!error) return next();

    return next(new CustomError(error.message.replaceAll('"', "'"), 400));
  };
