import { UpdateUser, User } from "@/types/user.type";
import { ValidationError, object, string } from "yup";

export const createUserValidation = (payload: User) => {
  const schema = object({
    id: string().required("ID is required"),
    name: string().required("Name is required"),
    email: string().required("Email is required"),
    password: string().required("Password is required"),
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

export const updateUserValidation = (payload: UpdateUser) => {
  const schema = object({
    name: string().optional(),
    email: string().optional(),
    currentPassword: string().optional(),
    newPassword: string().optional(),
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
