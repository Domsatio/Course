import { Checkout } from "@/types/checkout.type";
import { ValidationError, object, string, array } from "yup";

export const createCheckoutValidation = (payload: Checkout) => {
  const schema = object({
    transactionDetails: object({
      orderId: string().required("Order ID is required"),
      grossAmount: string().required("Gross amount is required"),
    }).optional(),
    customerDetails: object({
      name: string().required("Name is required"),
      email: string().required("Email is required"),
      phone: string().required("Phone is required"),
      country: string().required("Country is required"),
      city: string().required("City is required"),
      address: string().required("Address is required"),
      postcode: string().required("Postcode is required"),
    }).required("Customer details is required"),
    item_details: array(
        object({
            id: string().required("ID is required"),
            name: string().required("Name is required"),
            price: string().required("Price is required"),
            quantity: string().required("Quantity is required"),
        })
        ).required("Item details is required"),
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
