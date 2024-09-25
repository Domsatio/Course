import { Category, UpdateCategory } from "@/types/category.type";
import { ValidationError, object, string } from "yup";

export const createCategoryValidation = (payload: Category) => {
  const schema = object({
    id: string().required("ID is required"),
    name: string().required("Name is required"),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { validatedData: null, errors: error.errors };
    }
    return { validatedData: null, errors: ["An unexpected error occurred"] };
  }
};

export const updateCategoryValidation = (payload: UpdateCategory) => {
  const schema = object({
    name: string().required("Name is required"),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { validatedData: null, errors: error.errors };
    }
    return { validatedData: null, errors: ["An unexpected error occurred"] };
  }
};
