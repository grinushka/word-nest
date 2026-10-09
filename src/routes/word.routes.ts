import { Router } from 'express';
import {
  createWordController,
  deleteWordController,
  getWordController,
  getWordsController,
  updateWordController,
} from '../controllers/word.controller';

const router = Router();

router.get('/', getWordsController);
router.post('/', createWordController);
router.get('/:id', getWordController);
router.patch('/:id', updateWordController);
router.delete('/:id', deleteWordController);

export default router;
