import { convertStringToBoolean } from "@/helpers/appFunction";
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

export const updateUser = async (
  id: string,
  { name, email, newPassword }: UpdateUser
) => {
  return prisma.user.update({
    where: { id },
    data: {
      name: name,
      email: email,
      password: newPassword,
    },
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

export const getAllUsers = async (
  skip: number = 0,
  take: number = 5,
  search: string = "",
  isSubscribed: boolean | string | undefined = undefined
) => {
  let whereCondition: any = {
    OR: [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ],
  };

  if (isSubscribed) {
    whereCondition.isSubscribed = convertStringToBoolean(
      isSubscribed as string
    );
  }
  return prisma.$transaction(
    async (tx) => {
      const totalData = await tx.user.count({
        where: whereCondition,
      });

      const data = await tx.user.findMany({
        where: whereCondition,
        skip,
        take,
        orderBy: {
          name: "asc",
        },
      });

      return { totalData, data };
    },
    { maxWait: 5000, timeout: 20000 }
  );
};
