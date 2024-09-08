import { Post } from "./post.type";

export type Category = {
  id: string;
  name: string;
};

export type UpdateCategory = Omit<Category, "id">;

export type GetCategory = {
  id: string;
  name: string;
  posts: {
    categoryId: string;
    postId: string;
    post: Post;
  }[];
};
