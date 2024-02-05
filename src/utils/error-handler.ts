import { ErrorTypes } from './error-types.ts';

export class CustomError extends Error {
  code: number;
  data: unknown;

  constructor(message: string, data?: unknown) {
    super(message);

    this.code = ErrorTypes.BadRequest;
    this.name = 'CustomError';
    this.data = data;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, data?: unknown) {
    super(message, data);

    this.code = ErrorTypes.NotFound;
    this.name = 'NotFoundError';
  }
}
