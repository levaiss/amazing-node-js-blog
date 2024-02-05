import { RequestStatusCodes } from './request-status-codes.ts';

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