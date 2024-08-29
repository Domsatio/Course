import { UpdateUser, User } from "@/types/user.type";
import { object, string } from "yup";

export const createUserValidation = (payload: User) => {
  const schema = object({
    id: string().required("ID is required"),
    email: string().required("Email is required"),
    password: string().required("Password is required"),
    name: string().optional(),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error: any) {
    return { validatedData: null, errors: error.errors as string[] };
  }
};

export const updateUserValidation = (payload: UpdateUser) => {
  const schema = object({
    email: string().optional(),
    password: string().optional(),
    name: string().optional(),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error: any) {
    return { validatedData: null, errors: error.errors as string[] };
  }
};
