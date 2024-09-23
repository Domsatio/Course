import { Post, UpdatePost } from "@/types/post.type";
import { array, boolean, object, string } from "yup";

export const createPostValidation = (payload: Post) => {
  const schema = object({
    id: string().required("ID is required"),
    userId: string().required("User ID is required"),
    title: string().required("Title is required"),
    slug: string().required("Slug is required"),
    body: string().required("Body is required"),
    thumbnail: string().required("Thumbnail is required"),
    published: boolean().required().default(false),
    categories: array().optional(),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error: any) {
    return { validatedData: null, errors: error.errors as string[] };
  }
};

export const updatePostValidation = (payload: UpdatePost) => {
  const schema = object({
    title: string().optional(),
    slug: string().optional(),
    body: string().optional(),
    thumbnail: string().optional(),
    published: boolean().required(),
    categories: array().optional(),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error: any) {
    return { validatedData: null, errors: error.errors as string[] };
  }
};
