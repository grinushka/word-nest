import type { NextFunction, Request, Response } from 'express';
import {
  assignWordToCategory,
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../services/category.service';
import {
  validateAssignWordToCategory,
  validateCreateCategory,
  validateDeleteCategory,
  validateUpdateCategory,
} from '../validators/category.validator';

const getCategoriesController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await getCategories();
    res.status(200).json({ data: categories });
  } catch (error) {
    next(error);
  }
};

const assignWordToCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = validateAssignWordToCategory(req.body);
    const word = await assignWordToCategory(payload);
    res.status(200).json({ data: word });
  } catch (error) {
    next(error);
  }
};

const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = validateCreateCategory(req.body);
    const category = await createCategory(payload);
    res.status(201).json({ data: category });
  } catch (error) {
    next(error);
  }
};

const updateCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, ...payload } = validateUpdateCategory(req.body);
    const category = await updateCategory(id, payload);
    res.status(200).json({ data: category });
  } catch (error) {
    next(error);
  }
};

const deleteCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateDeleteCategory(req.body);
    await deleteCategory(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export {
  getCategoriesController,
  assignWordToCategoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
