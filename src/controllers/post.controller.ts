import { db } from "@/libs/prisma";
import { Post, UpdatePost } from "@/types/post.type";

export const getPosts = async () => {
  return db.post.findMany({
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
  return db.post.findUnique({
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
  return db.post.create({
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
  return db.$transaction(async (tx: typeof db) => {
    await tx.post.update({
      where: { id },
      data: {
        categories: {
          deleteMany: {},
        },
      },
    });

    return tx.post.update({
      where: { id },
      data: {
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
  });
};

export const deletePost = async (id: string) => {
  return db.$transaction(async (tx: typeof db) => {
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
