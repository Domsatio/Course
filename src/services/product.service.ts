import instance from "@/libs/axios/instance";
import { Product, UpdateProduct } from "@/types/product.type";

const productServices = {
  addProduct: (product: Product) => instance.post("/api/product", product),
  getProducts: () => instance.get("/api/product"),
  getProduct: (id: string) =>
    instance.get("/api/product", { params: { id: id } }),
  updateProduct: (id: string, product: UpdateProduct) =>
    instance.put("/api/product", product, { params: { id: id } }),
  deleteProduct: (id: string) =>
    instance.delete("/api/product", { params: { id: id } }),
};

export default productServices;
