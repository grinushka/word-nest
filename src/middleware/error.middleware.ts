import type { ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { constants as HTTP_STATUS } from 'node:http2';
import { ZodError } from 'zod';
import { PRISMA_ERROR_CODES } from '../utils/prisma-errors';
import { HttpError } from '../utils/http-error';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(HTTP_STATUS.HTTP_STATUS_BAD_REQUEST).json({
      message: 'Validation failed.',
      details: error.issues,
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) {
      res.status(HTTP_STATUS.HTTP_STATUS_CONFLICT).json({
        message: 'Resource already exists.',
        details: error.meta,
      });
      return;
    }

    if (error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
      res.status(HTTP_STATUS.HTTP_STATUS_NOT_FOUND).json({
        message: 'Resource not found.',
        details: error.meta,
      });
      return;
    }
  }

  res.status(HTTP_STATUS.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
  });
};

export { HttpError, errorHandler };
