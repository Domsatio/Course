import { CreateCart, UpdateCart } from "@/types/cart.type";
import { ValidationError, object, string, number } from "yup";

export const createCartValidation = (payload: CreateCart) => {
  const schema = object({
    id: string().required("ID is required"),
    productId: string().required("Product ID is required"),
    quantity: number().required("Quantity is required"),
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

export const updateCartValidation = (payload: UpdateCart) => {
  const schema = object({
    userId: string().required("User ID is required"),
    productId: string().required("Product ID is required"),
    quantity: number().required("Quantity is required"),
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