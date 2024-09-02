import { db } from "@/libs/prisma";
import { UpdateUser, User } from "@/types/user.type";

export const createUser = async (data: User) => {
  return db.user.create({ data });
};

export const existingUser = async (email: string) => {
  return db.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (id: string, data: UpdateUser) => {
  return db.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return db.user.delete({
    where: { id },
  });
};

export const getOneUser = async (id: string) => {
  return db.user.findUnique({
    where: { id },
  });
};

export const getAllUsers = async () => {
  return db.user.findMany();
};

export const loginUser = async (data: User) => {
  return db.user.findFirst({ where: data });
};
