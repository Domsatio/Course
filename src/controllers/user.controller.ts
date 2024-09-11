import prisma from "@/libs/prisma/db";
import { UpdateUser, User } from "@/types/user.type";

export const createUser = async (data: User) => {
  return prisma.user.create({ data });
};

export const existingUser = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (id: string, data: UpdateUser) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};

export const getOneUser = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const getAllUsers = async (skip: number = 0, take: number = 5) => {
  return prisma.$transaction(async (tx) => {
    const totalData = await tx.user.count();

    const data = await tx.user.findMany({
      skip,
      take,
      orderBy: {
        name: "asc",
      },
    });

    return { totalData, data };
  });
};

export const loginUser = async (data: User) => {
  return prisma.user.findFirst({ where: data });
};
