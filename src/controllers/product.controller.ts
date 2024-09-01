import { db } from "@/libs/prisma";
import { Product, UpdateProduct } from "@/types/product.type";

export const getProducts = async () => {
  return db.product.findMany();
};

export const getProduct = async (id: string) => {
  return db.product.findUnique({
    where: { id },
  });
};

export const createProduct = async (data: Product) => {
  return db.product.create({ data });
};

export const updateProduct = async (id: string, data: UpdateProduct) => {
  return db.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return db.product.delete({
    where: { id },
  });
};
