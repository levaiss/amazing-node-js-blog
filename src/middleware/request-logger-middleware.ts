import { NextFunction, Request, Response } from 'express';

export function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`🚀 ${req.method} ${req.path} - ${new Date()}`)
  next();
}