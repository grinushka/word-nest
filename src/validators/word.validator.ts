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

type CreateWordInput = z.infer<typeof createWordSchema>;
type UpdateWordInput = z.infer<typeof updateWordSchema>;

const validateCreateWord = (body: unknown): CreateWordInput => {
  try {
    return createWordSchema.parse(body);
  } catch (error) {
    throw toHttpError(error);
  }
};

const validateUpdateWord = (body: unknown): UpdateWordInput => {
  try {
    return updateWordSchema.parse(body);
  } catch (error) {
    throw toHttpError(error);
  }
};

export { validateCreateWord, validateUpdateWord };
export type { CreateWordInput, UpdateWordInput };
