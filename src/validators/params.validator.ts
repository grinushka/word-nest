import { z } from 'zod';
import { toHttpError } from '../utils/http-error';

const idParamSchema = z.object({
  id: z.coerce.number().int().positive('id must be a positive integer.'),
});

const validateIdParam = (params: unknown): number => {
  try {
    return idParamSchema.parse(params).id;
  } catch (error) {
    throw toHttpError(error);
  }
};

export { validateIdParam };
