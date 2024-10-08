import { ValidationError, object, string } from "yup";
import { Email } from "@/types/email.type";

export const createEmailValidation = (payload: Email) => {
  const schema = object({
    name: string().required("Name is required"),
    email: string().required("Email is required"),
    message: string().required("Message is required"),
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
