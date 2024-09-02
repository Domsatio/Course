import prisma from "@/libs/prisma/db";
import { Order, UpdateOrder } from "@/types/order.type";

export const getOrders = async () => {
  return prisma.order.findMany({
    include: {
      product: true,
      user: true,
    },
  });
};

export const getOrder = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      product: true,
      user: true,
    },
  });
};

export const createOrder = async (data: Order) => {
  return prisma.order.create({ data });
};

export const updateOrder = async (id: string, data: UpdateOrder) => {
  return prisma.order.update({
    where: { id },
    data,
  });
};

export const deleteOrder = async (id: string) => {
  return prisma.order.delete({
    where: { id },
  });
};
