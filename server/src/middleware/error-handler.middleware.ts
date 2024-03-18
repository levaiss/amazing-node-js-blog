// Core
import { NextFunction, Request, Response } from 'express';
import { MongooseError } from 'mongoose';

// Helpers
import { RequestStatusCodes } from '../const/request-status-codes';
import { CustomError } from '../errors';

export function errorHandlerMiddleware(error: Error | CustomError | never, req: Request, res: Response, next: NextFunction) {
  let isExpectedError = false;
  let code: number = RequestStatusCodes.BadRequest;
  let message: string = 'Something went wrong';
  let data = null;

  if (error instanceof CustomError) {
    code = error.code;
    message = error.message;
    data = error.data;

    isExpectedError = true;
  }

  if (error instanceof MongooseError) {
    code = RequestStatusCodes.Validation;
    message = error.message;
    data = error;

    isExpectedError = true;
  }

  if (!isExpectedError) {
    console.log(error);
  }

  res.status(code).json({
    message,
    data,
  });

  next();
}
