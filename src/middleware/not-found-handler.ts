import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../utils/error-helper';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(new NotFoundError('API endpoint not found!'));
}