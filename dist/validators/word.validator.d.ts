import { z } from 'zod';
declare const createWordSchema: z.ZodObject<{
    word: z.ZodString;
    meaning: z.ZodString;
    example: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<{
        UNKNOWN: "UNKNOWN";
        LEARNING: "LEARNING";
        LEARNED: "LEARNED";
    }>>;
}, z.core.$strip>;
declare const updateWordSchema: z.ZodObject<{
    word: z.ZodOptional<z.ZodString>;
    meaning: z.ZodOptional<z.ZodString>;
    example: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        UNKNOWN: "UNKNOWN";
        LEARNING: "LEARNING";
        LEARNED: "LEARNED";
    }>>;
}, z.core.$strip>;
type CreateWordInput = z.infer<typeof createWordSchema>;
type UpdateWordInput = z.infer<typeof updateWordSchema>;
declare const parseWordId: (idParam: string | number) => number;
declare const parseWordIdFromBody: (body: unknown) => number;
declare const validateCreateWord: (body: unknown) => CreateWordInput;
declare const validateUpdateWord: (body: unknown) => UpdateWordInput;
export { parseWordId, parseWordIdFromBody, validateCreateWord, validateUpdateWord };
export type { CreateWordInput, UpdateWordInput };
//# sourceMappingURL=word.validator.d.ts.map