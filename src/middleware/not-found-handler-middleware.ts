import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors';

export function notFoundHandlerMiddleware(req: Request, res: Response, next: NextFunction) {
  next(new NotFoundError('API endpoint not found!'));
}