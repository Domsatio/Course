import instance from "@/libs/axios/instance";
import { Post, UpdatePost } from "@/types/post.type";

const postServices = {
  addPost: (post: Post) => instance.post("/post", post),
  getPosts: () => instance.get("/post"),
  getPost: (id: string) => instance.get("/post", { params: { id: id } }),
  updatePost: (id: string, post: UpdatePost) =>
    instance.put("/post", post, { params: { id: id } }),
  deletePost: (id: string) => instance.delete("/post", { params: { id: id } }),
};

export default postServices;
