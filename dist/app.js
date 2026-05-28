"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const error_middleware_1 = require("./middleware/error.middleware");
const http_error_1 = require("./utils/http-error");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.use('/api', index_1.default);
app.use((_req, _res, next) => {
    next(new http_error_1.HttpError(404, 'Route not found.'));
});
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map