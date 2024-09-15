export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export type Order = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  status?: OrderStatus;
};

export type UpdateOrder = {
  quantity?: number;
  status?: OrderStatus;
};

export type GetOrder = {
  id: string;
  quantity: number;
  status: OrderStatus;
  createdAt: string;
  user: {
    id: string;
    email: string;
  };
  product: {
    id: string;
    image: string;
    name: string;
    price: number;
  };
};
