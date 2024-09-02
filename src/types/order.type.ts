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
