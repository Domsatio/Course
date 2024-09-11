import prisma from "@/libs/prisma/db";
import { Product, UpdateProduct } from "@/types/product.type";

export const getProducts = async (skip: number = 0, take: number = 5) => {
  return prisma.$transaction(async (tx) => {
    const totalData = await tx.product.count();

    const data = await tx.product.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { totalData, data };
  });
};

export const getProduct = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const createProduct = async (data: Product) => {
  return prisma.product.create({ data });
};

export const updateProduct = async (id: string, data: UpdateProduct) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
