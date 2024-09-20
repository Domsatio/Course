import prisma from "@/libs/prisma/db";
import { Product, UpdateProduct } from "@/types/product.type";

export const getProducts = async (
  skip: number = 0,
  take: number = 5,
  search: string = ""
) => {
  let whereCondition: any = {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  };

  const searchNumber = Number(search);
  if (!isNaN(searchNumber)) {
    whereCondition.OR.push(
      {
        price: {
          equals: searchNumber,
        },
      },
      {
        quantity: {
          equals: searchNumber,
        },
      }
    );
  }

  return prisma.$transaction(async (tx) => {
    const totalData = await tx.product.count({
      where: whereCondition,
    });

    const data = await tx.product.findMany({
      where: whereCondition,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { totalData, data };
  });
};

export const getProduct = async (param: string) => {
  return prisma.product.findFirst({
    where: {
      OR: [{ id: param }, { slug: param }],
    },
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
