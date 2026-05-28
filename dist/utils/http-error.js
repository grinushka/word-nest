"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHttpError = exports.HttpError = void 0;
const zod_1 = require("zod");
class HttpError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}
exports.HttpError = HttpError;
const toHttpError = (error) => {
    if (error instanceof HttpError) {
        return error;
    }
    if (error instanceof zod_1.ZodError) {
        return new HttpError(400, 'Validation failed.', error.issues);
    }
    return new HttpError(400, 'Invalid request payload.');
};
exports.toHttpError = toHttpError;
//# sourceMappingURL=http-error.js.map