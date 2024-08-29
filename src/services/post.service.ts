import instance from "@/libs/axios/instance";
import { Post, UpdatePost } from "@/types/post.type";

const postServices = {
  addPost: (post: Post) => instance.post("/api/post", post),
  getPosts: () => instance.get("/api/post"),
  getPost: (id: string) => instance.get("/api/post", { params: { id: id } }),
  updatePost: (id: string, post: UpdatePost) =>
    instance.put("/api/post", post, { params: { id: id } }),
  deletePost: (id: string) =>
    instance.delete("/api/post", { params: { id: id } }),
};

export default postServices;
