import prisma from '../db/prisma';
import { HttpError } from '../utils/http-error';
import type { CreateWordInput, UpdateWordInput } from '../validators/word.validator';

const wordWithCategories = {
  categories: true,
} as const;

const getWords = () => {
  return prisma.word.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: wordWithCategories,
  });
};

const getWord = async (id: number) => {
  const word = await prisma.word.findUnique({
    where: { id },
    include: wordWithCategories,
  });

  if (!word) {
    throw new HttpError(404, `Word with id ${id} not found.`);
  }

  return word;
};

const createWord = (data: CreateWordInput) => {
  const { categoryIds, ...wordData } = data;

  return prisma.$transaction(async (tx) => {
    if (categoryIds && categoryIds.length > 0) {
      const existingCategories = await tx.category.findMany({
        where: {
          id: { in: categoryIds },
        },
        select: { id: true },
      });

      if (existingCategories.length !== categoryIds.length) {
        throw new HttpError(404, 'One or more categories were not found.');
      }
    }

    return tx.word.create({
      data: {
        ...wordData,
        categories: categoryIds && categoryIds.length > 0
          ? {
              connect: categoryIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: wordWithCategories,
    });
  });
};

const updateWord = async (id: number, data: UpdateWordInput) => {
  const existingWord = await prisma.word.findUnique({
    where: { id },
  });

  if (!existingWord) {
    throw new HttpError(404, `Word with id ${id} not found.`);
  }

  const { categoryIds, ...wordData } = data;

  return prisma.$transaction(async (tx) => {
    if (categoryIds !== undefined) {
      if (categoryIds.length > 0) {
        const existingCategories = await tx.category.findMany({
          where: {
            id: { in: categoryIds },
          },
          select: { id: true },
        });

        if (existingCategories.length !== categoryIds.length) {
          throw new HttpError(404, 'One or more categories were not found.');
        }
      }

      return tx.word.update({
        where: { id },
        data: {
          ...wordData,
          categories: {
            set: categoryIds.map((categoryId) => ({ id: categoryId })),
          },
        },
        include: wordWithCategories,
      });
    }

    return tx.word.update({
      where: { id },
      data: wordData,
      include: wordWithCategories,
    });
  });
};

const deleteWord = async (id: number) => {
  const existingWord = await prisma.word.findUnique({
    where: { id },
  });

  if (!existingWord) {
    throw new HttpError(404, `Word with id ${id} not found.`);
  }

  await prisma.word.delete({
    where: { id },
  });
};

export { createWord, deleteWord, getWord, getWords, updateWord };
