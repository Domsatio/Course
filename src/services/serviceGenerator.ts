import instance from "@/libs/axios/instance";
import { UpdateAddress } from "@/types/address.type";
import { Category, UpdateCategory } from "@/types/category.type";
import { Course, UpdateCourse } from "@/types/course.type";
import { Order, UpdateOrder } from "@/types/order.type";
import { Post, UpdatePost } from "@/types/post.type";
import { Product, UpdateProduct } from "@/types/product.type";
import { UpdateUser, User } from "@/types/user.type";

const tokenHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const createService = <T, U>(endpoint: string) => ({
  getItems: (params?: Record<string, any>) =>
    instance.get(`/api/${endpoint}`, { params }),
  getItem: (params?: Record<string, any>) =>
    instance.get(`/api/${endpoint}`, { params }),
  addItem: (item: T) => instance.post(`/api/${endpoint}`, item),
  updateItem: (item: U, params?: Record<string, any>) =>
    instance.put(`/api/${endpoint}`, item, { params }),
  deleteItem: (params?: Record<string, any>) =>
    instance.delete(`/api/${endpoint}`, { params }),
});

export const categoryServices = createService<Category, UpdateCategory>(
  "category"
);
export const courseServices = createService<Course, UpdateCourse>("course");
export const orderServices = createService<Order, UpdateOrder>("order");
export const postServices = createService<Post, UpdatePost>("post");
export const productServices = createService<Product, UpdateProduct>("product");
export const userServices = createService<User, UpdateUser>("user");
export const addressServices = createService<UpdateAddress, UpdateAddress>(
  "address"
);
export const dashboardServices = {
  getDashboard: (token: string) =>
    instance.get("/api/dashboard", tokenHeader(token)),
};
