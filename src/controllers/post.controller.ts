import { db } from "@/libs/prisma";
import { Post, UpdatePost } from "@/types/post.type";

export const getPosts = async () => {
  return db.post.findMany();
};

export const getPost = async (id: any) => {
  return db.post.findUnique({
    where: { id },
  });
};

export const createPost = async (data: Post) => {
  return db.post.create({ data });
};

export const updatePost = async (id: string, data: UpdatePost) => {
  return db.post.update({
    where: { id },
    data,
  });
};

export const deletePost = async (id: string) => {
  return db.post.delete({
    where: { id },
  });
};
