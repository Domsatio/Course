import { ValidationError, object, mixed } from "yup";
import { Subscription } from "@/types/subscription.type";

export const createSubscriptionValidation = (payload: Subscription) => {
  const schema = object({
    plan: mixed()
    .oneOf(['monthly', 'annually'], "Invalid plan selected")
    .required("Plan is required"),
    paymentMethod: mixed()
    .oneOf(['credit_card', 'gopay'], "Invalid payment method selected")
    .required("Payment method is required"),
    payload: object().required("Payload is required"),
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

export const updateSubscriptionValidation = (payload: Subscription) => {
  const schema = object({
    plan: mixed()
    .oneOf(['monthly', 'annually'], "Invalid plan selected")
    .required("Plan is required"),
    paymentMethod: mixed()
    .oneOf(['credit_card', 'gopay'], "Invalid payment method selected")
    .required("Payment method is required"),
    payload: object().required("Payload is required"),
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