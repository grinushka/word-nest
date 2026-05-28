"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.HttpError = void 0;
const client_1 = require("@prisma/client");
const node_http2_1 = require("node:http2");
const zod_1 = require("zod");
const prisma_errors_1 = require("../utils/prisma-errors");
const http_error_1 = require("../utils/http-error");
Object.defineProperty(exports, "HttpError", { enumerable: true, get: function () { return http_error_1.HttpError; } });
const errorHandler = (error, _req, res, _next) => {
    if (error instanceof http_error_1.HttpError) {
        res.status(error.statusCode).json({
            message: error.message,
            details: error.details,
        });
        return;
    }
    if (error instanceof zod_1.ZodError) {
        res.status(node_http2_1.constants.HTTP_STATUS_BAD_REQUEST).json({
            message: 'Validation failed.',
            details: error.issues,
        });
        return;
    }
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (error.code === prisma_errors_1.PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) {
            res.status(node_http2_1.constants.HTTP_STATUS_CONFLICT).json({
                message: 'Resource already exists.',
                details: error.meta,
            });
            return;
        }
        if (error.code === prisma_errors_1.PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
            res.status(node_http2_1.constants.HTTP_STATUS_NOT_FOUND).json({
                message: 'Resource not found.',
                details: error.meta,
            });
            return;
        }
    }
    res.status(node_http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map