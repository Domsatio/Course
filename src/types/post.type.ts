import { Category } from "./category.type";

export type Post = {
  id: string;
  userId: string;
  title: string;
  body: string;
  categories?: Category[];
};

export type UpdatePost = {
  title?: string;
  body?: string;
  categories?: Category[];
};
