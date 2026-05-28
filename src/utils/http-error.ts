import { ZodError } from 'zod';

class HttpError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const toHttpError = (error: unknown) => {
  if (error instanceof HttpError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new HttpError(400, 'Validation failed.', error.issues);
  }

  return new HttpError(400, 'Invalid request payload.');
};

export { HttpError, toHttpError };
