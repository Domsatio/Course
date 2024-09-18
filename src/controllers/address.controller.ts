import prisma from "@/libs/prisma/db";
import { UpdateAddress } from "@/types/address.type";

export const getOneAddress = async (userId: string) => {
  return prisma.address.findUnique({
    where: { userId },
  });
};

export const upsertAddress = async (userId: string, data: UpdateAddress) => {
  return prisma.address.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });
};
