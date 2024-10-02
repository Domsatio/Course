import { GetProduct } from "./product.type";

export type Cart = {
  id: string;
  userId: string;
  productId: string;
  quantity?: number;
  isChecked?: boolean;
};

export type CreateCart = Omit<Cart, "id" | "userId">;

export type UpdateCart = {
  id: string;
  quantity?: number;
  isChecked?: boolean;
};

export type GetCart = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  isChecked?: boolean;
  product: GetProduct;
};
