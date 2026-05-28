import { Router } from 'express';
import {
  createWordController,
  deleteWordController,
  getWordsController,
  updateWordController,
} from '../controllers/word.controller';

const router = Router();

router.get('/', getWordsController);
router.post('/', createWordController);
router.patch('/', updateWordController);
router.delete('/', deleteWordController);

export default router;
