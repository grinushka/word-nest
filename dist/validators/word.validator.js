"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateWord = exports.validateCreateWord = exports.parseWordIdFromBody = exports.parseWordId = void 0;
const zod_1 = require("zod");
const http_error_1 = require("../utils/http-error");
const wordStatusSchema = zod_1.z.enum(['UNKNOWN', 'LEARNING', 'LEARNED']);
const createWordSchema = zod_1.z.object({
    word: zod_1.z.string().trim().min(1, 'word must be a non-empty string.'),
    meaning: zod_1.z.string().trim().min(1, 'meaning must be a non-empty string.'),
    example: zod_1.z.string().trim().optional(),
    status: wordStatusSchema.default('UNKNOWN'),
});
const updateWordSchema = zod_1.z
    .object({
    word: zod_1.z.string().trim().min(1, 'word must be a non-empty string.').optional(),
    meaning: zod_1.z.string().trim().min(1, 'meaning must be a non-empty string.').optional(),
    example: zod_1.z.string().trim().optional(),
    status: wordStatusSchema.optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one updatable field is required.',
});
const idSchema = zod_1.z.coerce.number().int().positive('id must be a positive integer.');
const idFromBodySchema = zod_1.z.object({
    id: idSchema,
});
const parseWordId = (idParam) => {
    try {
        return idSchema.parse(idParam);
    }
    catch (error) {
        throw (0, http_error_1.toHttpError)(error);
    }
};
exports.parseWordId = parseWordId;
const parseWordIdFromBody = (body) => {
    try {
        return idFromBodySchema.parse(body).id;
    }
    catch (error) {
        throw (0, http_error_1.toHttpError)(error);
    }
};
exports.parseWordIdFromBody = parseWordIdFromBody;
const validateCreateWord = (body) => {
    try {
        return createWordSchema.parse(body);
    }
    catch (error) {
        throw (0, http_error_1.toHttpError)(error);
    }
};
exports.validateCreateWord = validateCreateWord;
const validateUpdateWord = (body) => {
    try {
        return updateWordSchema.parse(body);
    }
    catch (error) {
        throw (0, http_error_1.toHttpError)(error);
    }
};
exports.validateUpdateWord = validateUpdateWord;
//# sourceMappingURL=word.validator.js.map