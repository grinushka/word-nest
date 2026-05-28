import type { CreateWordInput, UpdateWordInput } from '../validators/word.validator';
declare const listWords: () => import("@prisma/client").Prisma.PrismaPromise<{
    word: string;
    meaning: string;
    example: string | null;
    status: import("@prisma/client").$Enums.WordStatus;
    id: number;
    createdAt: Date;
}[]>;
declare const createWord: (data: CreateWordInput) => import("@prisma/client").Prisma.Prisma__WordClient<{
    word: string;
    meaning: string;
    example: string | null;
    status: import("@prisma/client").$Enums.WordStatus;
    id: number;
    createdAt: Date;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    adapter: import("@prisma/adapter-pg").PrismaPg;
}>;
declare const updateWord: (id: number, data: UpdateWordInput) => Promise<{
    word: string;
    meaning: string;
    example: string | null;
    status: import("@prisma/client").$Enums.WordStatus;
    id: number;
    createdAt: Date;
}>;
declare const deleteWord: (id: number) => Promise<void>;
export { createWord, deleteWord, listWords, updateWord };
//# sourceMappingURL=word.service.d.ts.map