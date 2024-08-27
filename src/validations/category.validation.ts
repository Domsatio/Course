import { Category, UpdateCategory } from "@/types/category.type";
import { object, string } from "yup";

export const createCategoryValidation = (payload: Category) => {
  const schema = object({
    id: string().required("ID is required"),
    name: string().required("Name is required"),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error: any) {
    return { validatedData: null, errors: error.errors as string[] };
  }
};

export const updateCategoryValidation = (payload: UpdateCategory) => {
  const schema = object({
    name: string().required("Name is required"),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error: any) {
    return { validatedData: null, errors: error.errors as string[] };
  }
};
