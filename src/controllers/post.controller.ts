import prisma from "@/libs/prisma/db";
import { Post, UpdatePost } from "@/types/post.type";

export const getPosts = async (skip: number = 0, take: number = 5) => {
  return prisma.$transaction(async (tx) => {
    const totalData = await tx.post.count();

    const data = await tx.post.findMany({
      skip,
      take,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { totalData, data };
  });
};

export const getPost = async (id: string) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
};

export const createPost = async ({
  id,
  userId,
  title,
  body,
  categories,
  published,
}: Post) => {
  return prisma.post.create({
    data: {
      id,
      userId,
      title,
      body,
      published,
      categories: {
        create: categories?.map((id) => ({
          category: {
            connect: { id },
          },
        })),
      },
    },
  });
};

export const updatePost = async (
  id: string,
  { title, body, categories, published }: UpdatePost
) => {
  return prisma.post.update({
    where: { id },
    data: {
      title,
      body,
      published,
      categories: {
        deleteMany: {},
        create: categories?.map((id) => ({
          category: {
            connect: { id },
          },
        })),
      },
    },
  });
};

export const deletePost = async (id: string) => {
  return prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id },
      data: {
        categories: {
          deleteMany: {},
        },
      },
    });

    return tx.post.delete({
      where: { id },
    });
  });
};
