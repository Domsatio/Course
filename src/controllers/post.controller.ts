import prisma from "@/libs/prisma/db";
import { Post, UpdatePost } from "@/types/post.type";

export const getPosts = async () => {
  return prisma.post.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
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
}: Post) => {
  return prisma.post.create({
    data: {
      id,
      userId,
      title,
      body,
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
  { title, body, categories }: UpdatePost
) => {
  return prisma.post.update({
    where: { id },
    data: {
      title,
      body,
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
