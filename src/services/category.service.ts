import prisma from '../db/prisma';
import { HttpError } from '../utils/http-error';
import type {
  AssignWordToCategoryInput,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../validators/category.validator';

const getCategories = () => {
  return prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const getCategory = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      words: true,
    },
  });

  if (!category) {
    throw new HttpError(404, `Category with id ${id} not found.`);
  }

  return category;
};

const createCategory = (data: CreateCategoryInput) => {
  return prisma.category.create({
    data,
  });
};

const updateCategory = async (id: number, data: UpdateCategoryInput) => {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    throw new HttpError(404, `Category with id ${id} not found.`);
  }

  return prisma.category.update({
    where: { id },
    data,
  });
};

const deleteCategory = async (id: number) => {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    throw new HttpError(404, `Category with id ${id} not found.`);
  }

  return prisma.category.delete({
    where: { id },
  });
};

const assignWordToCategory = async ({ wordId, categoryId }: AssignWordToCategoryInput) => {
  const [word, category] = await Promise.all([
    prisma.word.findUnique({ where: { id: wordId } }),
    prisma.category.findUnique({ where: { id: categoryId } }),
  ]);

  if (!word) {
    throw new HttpError(404, `Word with id ${wordId} not found.`);
  }

  if (!category) {
    throw new HttpError(404, `Category with id ${categoryId} not found.`);
  }

  return prisma.word.update({
    where: { id: wordId },
    data: {
      categories: {
        connect: { id: categoryId },
      },
    },
    include: {
      categories: true,
    },
  });
};

export {
  assignWordToCategory,
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
