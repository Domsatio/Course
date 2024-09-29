import { Product } from "./product.type";
export type Cart = {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
};

export type CreateCart = Omit<Cart, "id" | "userId">;

export type UpdateCart = {
    userId: string;
    productId: string;
    quantity: number;
}

export type GetCarts = {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    product: Product;
}