import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import { ValidationError } from '../errors';

export function requestValidationMiddleware(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new ValidationError('Request validation error', error.details))
    }

    next();
  }
}