import instance from "@/libs/axios/instance";
import { Course, UpdateCourse } from "@/types/course.type";

const courseServices = {
  addOrder: (course: Course) => instance.post("/api/course", course),
  getOrders: () => instance.get("/api/course"),
  getOrder: (id: string) => instance.get("/api/course", { params: { id: id } }),
  updateOrder: (id: string, course: UpdateCourse) =>
    instance.put("/api/course", course, { params: { id: id } }),
  deleteOrder: (id: string) =>
    instance.delete("/api/course", { params: { id: id } }),
};

export default courseServices;
