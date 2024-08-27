import instance from "@/libs/axios/instance";
import { Category, UpdateCategory } from "@/types/category.type";

const categoryServices = {
  getCategories: () => instance.get("/categories"),
  getCategory: (id: string) =>
    instance.get("/category", { params: { id: id } }),
  addCategory: (category: Category) => instance.post("/category", category),
  updateCategory: (id: string, category: UpdateCategory) =>
    instance.put("/category", category, { params: { id: id } }),
  deleteCategory: (id: string) =>
    instance.delete("/category", { params: { id: id } }),
};

export default categoryServices;
