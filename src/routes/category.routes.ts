import { Router } from 'express';
import {
  assignWordToCategoryController,
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  updateCategoryController,
} from '../controllers/category.controller';

const router = Router();

router.get('/', getCategoriesController);
router.post('/', createCategoryController);
router.post('/assign-word', assignWordToCategoryController);
router.patch('/', updateCategoryController);
router.delete('/', deleteCategoryController);

export default router;
