import prisma from "@/libs/prisma/db";
import { Category, UpdateCategory } from "@/types/category.type";

export const getCategories = async (
  skip: number = 0,
  take: number | string = 5
) => {
  return prisma.$transaction(async (tx) => {
    const totalData = await tx.category.count();
    const takeNumber = take === "all" ? totalData : Number(take);

    const data = await tx.category.findMany({
      skip,
      take: takeNumber,
      include: {
        posts: {
          include: {
            post: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return { totalData, data };
  });
};

export const getCategory = async (id: string) => {
  return prisma.category.findUnique({
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
  return prisma.category.create({ data });
};

export const updateCategory = async (id: string, data: UpdateCategory) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id: string) => {
  return prisma.$transaction(async (tx) => {
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
