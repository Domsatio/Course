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
  products: any;
  grossAmount: string;
  settlementTime?: string;
  token: any;
  transactionStatus: string;
  transactionTime?: string;
  customerDetails: any;
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
