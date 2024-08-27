export type Category = {
  id: string;
  name: string;
};

export type UpdateCategory = Omit<Category, "id">;
