import { db } from "@/libs/prisma";
import { Category, UpdateCategory } from "@/types/category.type";

export const getCategories = async () => {
  return db.category.findMany();
};

export const getCategory = async (id: string) => {
  return db.category.findUnique({
    where: { id },
  });
};

export const createCategory = async (data: Category) => {
  return db.category.create({ data });
};

export const updateCategory = async (id: string, data: UpdateCategory) => {
  return db.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id: string) => {
  return db.category.delete({
    where: { id },
  });
};
