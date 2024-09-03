import instance from "@/libs/axios/instance";
import { Order, UpdateOrder } from "@/types/order.type";

const orderServices = {
  addOrder: (order: Order) => instance.post("/api/order", order),
  getOrders: () => instance.get("/api/order"),
  getOrder: (id: string) => instance.get("/api/order", { params: { id: id } }),
  updateOrder: (id: string, order: UpdateOrder) =>
    instance.put("/api/order", order, { params: { id: id } }),
  deleteOrder: (id: string) =>
    instance.delete("/api/order", { params: { id: id } }),
};

export default orderServices;
