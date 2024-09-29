import prisma from "@/libs/prisma/db";
import { Cart, UpdateCart } from "@/types/cart.type";

export const getCarts = async (id: string) => {
  return prisma.$transaction(
    async (tx) => {
      const totalData = await tx.cart.count({
        where: {
          userId: id,
        },
      });

      const data = await tx.cart.findMany({
        where: {
          userId: id,
        },
        include: {
          product: true,
        },
      });

      return { totalData, data };
    },
    { maxWait: 5000, timeout: 20000 }
  );
};

export const createCart = async (data: Cart) => {
  const checkIsExist = await prisma.cart.findFirst({
    where: {
      userId: data.userId,
      productId: data.productId,
    },
  });

  if (checkIsExist) {
    return checkIsExist;
  } else {
    return prisma.cart.create({ data });
  }
};

export const updateCart = async (id: string, data: UpdateCart) => {
  return prisma.cart.update({
    where: { id: id },
    data: {
      quantity: data.quantity,
    },
  });
};

export const deleteCart = async (id:string, idCart: string[]) => {
  return prisma.cart.deleteMany({
    where: { 
      userId: id,
      id: {
        in: idCart,
      },
    },
  });
};
