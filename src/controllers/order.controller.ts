import prisma from "@/libs/prisma/db";
// import { Order, UpdateOrder } from "@/types/order.type";

export const getOrders = async (skip: number = 0, take: number = 5) => {
  return prisma.$transaction(async (tx) => {
    const totalData = await tx.order.count();

    const data = await tx.order.findMany({
      skip,
      take,
      include: {
        user: true,
      },
      orderBy: {
        transactionTime: "desc",
      },
    });

    return { totalData, data };
  });
};

export const getOrder = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
};

export const getOrderByUserId = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      user: true,
    },
    orderBy: {
      transactionTime: "desc",
    },
  });
};

export const createOrder = async (data: any) => {
  return prisma.order.create({ data });
};

export const updateOrder = async ({
  id,
  transactionStatus,
  transactionTime,
  settlementTime,
}: {
  id: string;
  transactionStatus: string;
  transactionTime: string;
  settlementTime?: string;
}) => {
  const checkTransactionStatus = await prisma.order.findUnique({
    where: { id },
  });

  if (checkTransactionStatus?.transactionStatus === "settlement") return;

  return prisma.order.update({
    where: { id },
    data: {
      transactionStatus,
      settlementTime,
      transactionTime,
    },
  });
};

export const deleteOrder = async (id: string) => {
  return prisma.order.delete({
    where: { id },
  });
};
