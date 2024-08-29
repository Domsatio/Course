import instance from "@/libs/axios/instance";
import { User, UpdateUser } from "@/types/user.type";

const userServices = {
  addUser: (user: User) => instance.post("/api/user", user),
  getUsers: () => instance.get("/api/user"),
  getUser: (id: string) => instance.get("/api/user", { params: { id: id } }),
  updateUser: (id: string, user: UpdateUser) =>
    instance.put("/api/user", user, { params: { id: id } }),
  deleteUser: (id: string) =>
    instance.delete("/api/user", { params: { id: id } }),
};

export default userServices;
