import prisma from '../db/prisma';
import { HttpError } from '../utils/http-error';
import type {
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

export { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
