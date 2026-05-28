declare class HttpError extends Error {
    statusCode: number;
    details?: unknown;
    constructor(statusCode: number, message: string, details?: unknown);
}
declare const toHttpError: (error: unknown) => HttpError;
export { HttpError, toHttpError };
//# sourceMappingURL=http-error.d.ts.map