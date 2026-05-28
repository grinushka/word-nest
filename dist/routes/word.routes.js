"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const word_controller_1 = require("../controllers/word.controller");
const router = (0, express_1.Router)();
router.get('/', word_controller_1.getWordsController);
router.post('/', word_controller_1.createWordController);
router.patch('/', word_controller_1.updateWordController);
router.delete('/', word_controller_1.deleteWordController);
exports.default = router;
//# sourceMappingURL=word.routes.js.map