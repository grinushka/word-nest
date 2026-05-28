declare const getCategories: () => import("@prisma/client").Prisma.PrismaPromise<{
    id: number;
    name: string;
}[]>;
declare const createCategory: (name: string) => import("@prisma/client").Prisma.Prisma__CategoryClient<{
    id: number;
    name: string;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    adapter: import("@prisma/adapter-pg").PrismaPg;
}>;
export { getCategories, createCategory };
//# sourceMappingURL=categories.service.d.ts.map