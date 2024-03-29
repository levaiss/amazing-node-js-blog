import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import { ValidationError } from '../errors';

export function requestBodyValidatorMiddleware(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new ValidationError('Request body validation error', error.details));
    }

    next();
  };
}

export function requestQueryValidatorMiddleware(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query);
    if (error) {
      next(new ValidationError('Request query validation error', error.details));
    }

    next();
  };
}

export function requestParamsValidatorMiddleware(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);
    if (error) {
      next(new ValidationError('Request query validation error', error.details));
    }

    next();
  };
}