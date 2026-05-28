import { z } from 'zod';
import { toHttpError } from '../utils/http-error';

const wordStatusSchema = z.enum(['UNKNOWN', 'LEARNING', 'LEARNED']);

const createWordSchema = z.object({
  word: z.string().trim().min(1, 'word must be a non-empty string.'),
  meaning: z.string().trim().min(1, 'meaning must be a non-empty string.'),
  example: z.string().trim().optional(),
  status: wordStatusSchema.default('UNKNOWN'),
  categoryIds: z.array(z.coerce.number().int().positive('category id must be a positive integer.')).optional(),
});

const updateWordSchema = z
  .object({
    id: z.coerce.number().int().positive('id must be a positive integer.'),
    word: z.string().trim().min(1, 'word must be a non-empty string.').optional(),
    meaning: z.string().trim().min(1, 'meaning must be a non-empty string.').optional(),
    example: z.string().trim().optional(),
    status: wordStatusSchema.optional(),
    categoryIds: z.array(z.coerce.number().int().positive('category id must be a positive integer.')).optional(),
  })
  .refine((data) => {
    return [data.word, data.meaning, data.example, data.status, data.categoryIds].some((value) => value !== undefined);
  }, {
    message: 'At least one updatable field is required.',
  });

const deleteWordSchema = z.object({
  id: z.coerce.number().int().positive('id must be a positive integer.'),
});

type CreateWordInput = z.infer<typeof createWordSchema>;
type UpdateWordRequestInput = z.infer<typeof updateWordSchema>;
type UpdateWordInput = Omit<UpdateWordRequestInput, 'id'>;

const validateDeleteWord = (body: unknown): number => {
  try {
    return deleteWordSchema.parse(body).id;
  } catch (error) {
    throw toHttpError(error);
  }
};

const validateCreateWord = (body: unknown): CreateWordInput => {
  try {
    return createWordSchema.parse(body);
  } catch (error) {
    throw toHttpError(error);
  }
};

const validateUpdateWord = (body: unknown): UpdateWordRequestInput => {
  try {
    return updateWordSchema.parse(body);
  } catch (error) {
    throw toHttpError(error);
  }
};

export { validateCreateWord, validateDeleteWord, validateUpdateWord };
export type { CreateWordInput, UpdateWordInput, UpdateWordRequestInput };
