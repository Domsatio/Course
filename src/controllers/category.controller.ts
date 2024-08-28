import { db } from "@/libs/prisma";
import { Category, UpdateCategory } from "@/types/category.type";

export const getCategories = async () => {
  return db.category.findMany({
    include: {
      posts: {
        include: {
          post: true,
        },
      },
    },
  });
};

export const getCategory = async (id: string) => {
  return db.category.findUnique({
    where: { id },
    include: {
      posts: {
        include: {
          post: true,
        },
      },
    },
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
  return db.$transaction(async (tx: typeof db) => {
    await tx.category.update({
      where: { id },
      data: {
        posts: {
          deleteMany: {},
        },
      },
    });

    return tx.category.delete({
      where: { id },
    });
  });
};
