import { Router } from 'express';
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
} from '../controllers/category.controller';

const router = Router();

router.get('/', getCategoriesController);
router.post('/', createCategoryController);
router.get('/:id', getCategoryController);
router.patch('/:id', updateCategoryController);
router.delete('/:id', deleteCategoryController);

export default router;
