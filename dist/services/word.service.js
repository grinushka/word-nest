"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWord = exports.listWords = exports.deleteWord = exports.createWord = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const http_error_1 = require("../utils/http-error");
const listWords = () => {
    return prisma_1.default.word.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
};
exports.listWords = listWords;
const createWord = (data) => {
    return prisma_1.default.word.create({
        data,
    });
};
exports.createWord = createWord;
const updateWord = async (id, data) => {
    const existingWord = await prisma_1.default.word.findUnique({
        where: { id },
    });
    if (!existingWord) {
        throw new http_error_1.HttpError(404, `Word with id ${id} not found.`);
    }
    return prisma_1.default.word.update({
        where: { id },
        data,
    });
};
exports.updateWord = updateWord;
const deleteWord = async (id) => {
    const existingWord = await prisma_1.default.word.findUnique({
        where: { id },
    });
    if (!existingWord) {
        throw new http_error_1.HttpError(404, `Word with id ${id} not found.`);
    }
    await prisma_1.default.word.delete({
        where: { id },
    });
};
exports.deleteWord = deleteWord;
//# sourceMappingURL=word.service.js.map