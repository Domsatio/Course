import { Order } from "./order.type";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  quantity: number;
};

export type UpdateProduct = {
  name?: string;
  description?: string;
  price?: number;
  discount?: number;
  image?: string;
  quantity?: number;
};

export type GetProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  quantity: number;
  orders: Order[];
};
