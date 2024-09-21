import { Order } from "./order.type";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  thumbnail: string;
  quantity: number;
};

export type UpdateProduct = {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  discount?: number;
  thumbnail?: string;
  quantity?: number;
};

export type GetProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  thumbnail: string;
  quantity: number;
  orders: Order[];
};
