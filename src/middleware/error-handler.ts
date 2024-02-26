import { NextFunction, Request, Response } from 'express';
import { RequestStatusCodes } from '../utils/request-status-codes';
import { CustomError } from '../utils/error-helper';

export function errorHandler(err: Error | CustomError | never, req: Request, res: Response, next: NextFunction) {
  let code: number = RequestStatusCodes.BadRequest;
  let message: string = 'Something went wrong';

  if (err instanceof CustomError) {
    code = err.code;
    message = err.message;
  }

  res
    .status(code)
    .json({
      message,
    });

  next();
}