import { Product } from "./product.type";

export type Order = {
  id: string;
  userId: string;
  products: Pick<Product, "id" | "quantity">[];
};
