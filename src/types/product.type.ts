export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
};

export type UpdateProduct = Omit<Product, "id">;
