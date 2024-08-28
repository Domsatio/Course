import { Category } from "./category.type";

export type Post = {
  id: string;
  userId: string;
  title: string;
  body: string;
  categories?: Pick<Category, "id">[];
};

export type UpdatePost = {
  title?: string;
  body?: string;
  categories?: Pick<Category, "id">[];
};