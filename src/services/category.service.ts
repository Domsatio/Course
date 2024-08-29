import instance from "@/libs/axios/instance";
import { Category, UpdateCategory } from "@/types/category.type";

const categoryServices = {
  getCategories: () => instance.get("/api/category"),
  getCategory: (id: string) =>
    instance.get("/api/category", { params: { id: id } }),
  addCategory: (category: Category) => instance.post("/api/category", category),
  updateCategory: (id: string, category: UpdateCategory) =>
    instance.put("/api/category", category, { params: { id: id } }),
  deleteCategory: (id: string) =>
    instance.delete("/api/category", { params: { id: id } }),
};

export default categoryServices;
