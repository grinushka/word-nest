import { z } from 'zod';
import { toHttpError } from '../utils/http-error';

const createCategorySchema = z.object({
  name: z.string().trim().min(1, 'name must be a non-empty string.'),
});

const updateCategorySchema = z
  .object({
    name: z.string().trim().min(1, 'name must be a non-empty string.').optional(),
  })
  .refine((data) => data.name !== undefined, {
    message: 'At least one updatable field is required.',
  });

const validateCreateCategory = (body: unknown): CreateCategoryInput => {
  try {
    return createCategorySchema.parse(body);
  } catch (error) {
    throw toHttpError(error);
  }
};

const validateUpdateCategory = (body: unknown): UpdateCategoryInput => {
  try {
    return updateCategorySchema.parse(body);
  } catch (error) {
    throw toHttpError(error);
  }
};

const assignWordToCategorySchema = z.object({
  wordId: z.coerce.number().int().positive('wordId must be a positive integer.'),
  categoryId: z.coerce.number().int().positive('categoryId must be a positive integer.'),
});

type CreateCategoryInput = z.infer<typeof createCategorySchema>;
type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
type AssignWordToCategoryInput = z.infer<typeof assignWordToCategorySchema>;

const validateAssignWordToCategory = (body: unknown): AssignWordToCategoryInput => {
  try {
    return assignWordToCategorySchema.parse(body);
  } catch (error) {
    throw toHttpError(error);
  }
};

export { validateAssignWordToCategory, validateCreateCategory, validateUpdateCategory };
export type { AssignWordToCategoryInput, CreateCategoryInput, UpdateCategoryInput };
