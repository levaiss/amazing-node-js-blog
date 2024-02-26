import { RequestStatusCodes } from './request-status-codes';

export class CustomError extends Error {
  code: number;
  data: unknown;

  constructor(message: string, data?: unknown) {
    super(message);

    this.code = RequestStatusCodes.BadRequest;
    this.name = 'CustomError';
    this.data = data;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, data?: unknown) {
    super(message, data);

    this.code = RequestStatusCodes.NotFound;
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends CustomError {
  constructor(message: string, data?: unknown) {
    super(message, data);

    this.code = RequestStatusCodes.Validation;
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized', data?: unknown) {
    super(message, data);

    this.code = RequestStatusCodes.Unauthorized;
    this.name = 'UnauthorizedError';
  }
}