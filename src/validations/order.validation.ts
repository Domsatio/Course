import { Order, OrderStatus, UpdateOrder } from "@/types/order.type";
import { object, number, string, mixed } from "yup";

export const createOrderValidation = (payload: Order) => {
  const schema = object({
    id: string().required("ID is required"),
    userId: string().required("User ID is required"),
    productId: string().required("Product ID is required"),
    quantity: number().required("Quantity is required"),
    status: mixed<OrderStatus>().oneOf(Object.values(OrderStatus)).optional(),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error: any) {
    return { validatedData: null, errors: error.errors as string[] };
  }
};

export const updateOrderValidation = (payload: UpdateOrder) => {
  const schema = object({
    quantity: number().optional(),
    status: mixed<OrderStatus>().oneOf(Object.values(OrderStatus)).optional(),
  });

  try {
    const validatedData = schema.validateSync(payload, { abortEarly: false });
    return { validatedData, errors: null };
  } catch (error: any) {
    return { validatedData: null, errors: error.errors as string[] };
  }
};
