"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateCategory = void 0;
const zod_1 = __importDefault(require("zod"));
const http_error_1 = require("../utils/http-error");
const createCategorySchema = zod_1.default.object({
    name: zod_1.default.string().trim().min(1, 'name must be a non-empty string.'),
});
const update;
const validateCreateCategory = (body) => {
    try {
        return createCategorySchema.parse(body);
    }
    catch (error) {
        throw (0, http_error_1.toHttpError)(error);
    }
};
exports.validateCreateCategory = validateCreateCategory;
//# sourceMappingURL=categories.validator.js.map