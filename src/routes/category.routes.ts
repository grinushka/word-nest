import { Router } from 'express';
import {
  assignWordToCategoryController,
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
} from '../controllers/category.controller';

const router = Router();

router.get('/', getCategoriesController);
router.post('/', createCategoryController);
router.post('/assign-word', assignWordToCategoryController);
router.get('/:id', getCategoryController);
router.patch('/:id', updateCategoryController);
router.delete('/:id', deleteCategoryController);

export default router;
