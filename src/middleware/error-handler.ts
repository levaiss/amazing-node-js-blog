import { NextFunction, Request, Response } from 'express';
import { RequestStatusCodes } from '../utils/request-status-codes';
import { CustomError } from '../errors';

export function errorHandler(err: Error | CustomError | never, req: Request, res: Response, next: NextFunction) {
  let code: number = RequestStatusCodes.BadRequest;
  let message: string = 'Something went wrong';
  let data = null;

  if (err instanceof CustomError) {
    code = err.code;
    message = err.message;
    data = err.data;
  }

  res
    .status(code)
    .json({
      message,
      data
    });

  next();
}