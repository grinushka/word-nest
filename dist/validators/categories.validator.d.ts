import z from "zod";
declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
declare const validateCreateCategory: (body: unknown) => {
    name: string;
};
type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export { validateCreateCategory };
export type { CreateCategoryInput };
//# sourceMappingURL=categories.validator.d.ts.map