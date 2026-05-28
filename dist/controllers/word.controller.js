"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWordController = exports.getWordsController = exports.deleteWordController = exports.createWordController = void 0;
const word_service_1 = require("../services/word.service");
const word_validator_1 = require("../validators/word.validator");
const getWordsController = async (_req, res, next) => {
    try {
        const words = await (0, word_service_1.listWords)();
        res.status(200).json({ data: words });
    }
    catch (error) {
        next(error);
    }
};
exports.getWordsController = getWordsController;
const createWordController = async (req, res, next) => {
    try {
        const payload = (0, word_validator_1.validateCreateWord)(req.body);
        const word = await (0, word_service_1.createWord)(payload);
        res.status(201).json({ data: word });
    }
    catch (error) {
        next(error);
    }
};
exports.createWordController = createWordController;
const updateWordController = async (req, res, next) => {
    try {
        const id = (0, word_validator_1.parseWordIdFromBody)(req.body);
        const payload = (0, word_validator_1.validateUpdateWord)(req.body);
        const word = await (0, word_service_1.updateWord)(id, payload);
        res.status(200).json({ data: word });
    }
    catch (error) {
        next(error);
    }
};
exports.updateWordController = updateWordController;
const deleteWordController = async (req, res, next) => {
    try {
        const id = (0, word_validator_1.parseWordIdFromBody)(req.body);
        await (0, word_service_1.deleteWord)(id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteWordController = deleteWordController;
//# sourceMappingURL=word.controller.js.map