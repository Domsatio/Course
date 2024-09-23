import { Category } from "./category.type";

export type Post = {
  id: string;
  userId: string;
  title: string;
  slug: string;
  body: string;
  thumbnail: string;
  published: boolean;
  categories?: string[];
};

export type UpdatePost = {
  title?: string;
  slug?: string;
  body?: string;
  thumbnail?: string;
  published?: boolean;
  categories?: string[];
};

export type CategoryPost = {
  postId: string;
  categoryId: string;
  category: Category;
};

export type GetPost = {
  id: string;
  title: string;
  slug: string;
  body: string;
  thumbnail: string;
  published: boolean;
  categories: CategoryPost[];
  createdAt: string;
};
