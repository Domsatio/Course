import { CreateCart, UpdateCart } from "@/types/cart.type";
import { ValidationError, object, string, number, boolean } from "yup";

export const createCartValidation = (payload: CreateCart) => {
  const schema = object({
    id: string().required("ID is required"),
    productId: string().required("Product ID is required"),
    quantity: number().optional().default(1),
    isChecked: boolean().optional().default(false),
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
    id: string().required("ID is required"),
    quantity: number().optional(),
    isChecked: boolean().optional(),
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