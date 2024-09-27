import { Product, UpdateProduct } from "@/types/product.type";
import { ValidationError, number, object, string } from "yup";

export const createProductValidation = (payload: Product) => {
  const schema = object({
    id: string().required("ID is required"),
    name: string().required("Name is required"),
    slug: string().required("Slug is required"),
    description: string().required("Description is required"),
    price: number().required("Price is required"),
    discount: number().required("Discount is required").default(0),
    thumbnail: string().required("Thumbnail is required"),
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

export const updateProductValidation = (payload: UpdateProduct) => {
  const schema = object({
    name: string().optional(),
    slug: string().optional(),
    description: string().optional(),
    price: number().optional(),
    discount: number().optional(),
    thumbnail: string().optional(),
    quantity: number().optional(),
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
