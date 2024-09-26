import { UpdateAddress } from "@/types/address.type";
import { ValidationError, object, string } from "yup";

export const updateAddressValidation = (payload: UpdateAddress) => {
  const schema = object({
    name: string().required("Name is required"),
    country: string().required("Country is required"),
    state: string().required("State is required"),
    city: string().required("City is required"),
    address: string().required("Address is required"),
    zip: string().required("Zip is required"),
    phone: string().required("Phone is required"),
    email: string().email("Email is invalid").required(),
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
