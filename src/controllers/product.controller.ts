import prisma from "@/libs/prisma/db";
import { Product, UpdateProduct } from "@/types/product.type";

export const getProducts = async () => {
  return prisma.product.findMany();
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
