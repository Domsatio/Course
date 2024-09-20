import { Course, UpdateCourse } from "@/types/course.type";
import { object, string, array, boolean } from "yup";

export const createCourseValidation = (payload: Course) => {
  const schema = object({
    id: string().required("ID is required"),
    title: string().required("Title is required"),
    slug: string().required("Slug is required"),
    description: string().required("Description is required"),
    image: array(
      object({
        image: string().required("Image is required"),
      })
    ).required("Image is required"),
    video: array(
      object({
        video: string().required("Video is required"),
        description: string().required("Description is required"),
        file: string().required("File is required"),
        thumbnailUrl: string().required("Thumbnail URL is required"),
      })
    ).required("Video is required"),
    published: boolean().required("Published is required"),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error: any) {
    return { validatedData: null, errors: error.errors as string[] };
  }
};

export const updateCourseValidation = (payload: UpdateCourse) => {
  const schema = object({
    title: string().optional(),
    slug: string().optional(),
    description: string().optional(),
    image: array(
      object({
        image: string().required("Image is required"),
      })
    ).optional(),
    video: array(
      object({
        video: string().required("Video is required"),
        description: string().required("Description is required"),
        file: string().required("File is required"),
        thumbnailUrl: string().required("Thumbnail URL is required"),
      })
    ).optional(),
    published: boolean().optional(),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error: any) {
    return { validatedData: null, errors: error.errors as string[] };
  }
};
