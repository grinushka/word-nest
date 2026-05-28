"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const getCategories = () => {
    return prisma_1.default.category.findMany();
};
exports.getCategories = getCategories;
const createCategory = (name) => {
    return prisma_1.default.category.create({
        data: {
            name,
        },
    });
};
exports.createCategory = createCategory;
//# sourceMappingURL=categories.service.js.map