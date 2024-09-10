import { Post } from "./post.type";

export type Category = {
  id: string;
  name: string;
};

export type UpdateCategory = Omit<Category, "id">;

export type PostCategory = {
  postId: string;
  categoryId: string;
  post: Post;
};

export type GetCategory = {
  id: string;
  name: string;
  posts: PostCategory[];
};
