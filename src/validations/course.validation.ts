import { Course, UpdateCourse } from "@/types/course.type";
import { object, number, string, mixed, array, boolean } from "yup";

export const createCourseValidation = (payload: Course) => {
  const schema = object({
    id: string().required("ID is required"),
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    image: array(
      object().shape({
        key: string().required(),
        value: string().required(),
      })
    ).required("Image is required"),
    video: object()
      .shape({
        key: string().required(),
        value: string().required(),
      })
      .required("Video is required"),
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
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    image: array(
      object().shape({
        key: string().required(),
        value: string().required(),
      })
    ).required("Image is required"),
    video: object()
      .shape({
        key: string().required(),
        value: string().required(),
      })
      .required("Video is required"),
    published: boolean().required("Published is required"),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error: any) {
    return { validatedData: null, errors: error.errors as string[] };
  }
};
