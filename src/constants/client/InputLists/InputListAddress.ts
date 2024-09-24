import { InputRenderProps } from "@/components/client/InputRender";
import { string } from "yup";

interface InputListProps extends InputRenderProps {
  validator: any;
}

export const InputList: InputListProps[] = [
  {
    label: "Name",
    name: "name",
    id: "name",
    type: "text",
    placeholder: "Your Name",
    isRequired: true,
    validator: string().required("Name is required"),
  },
  {
    label: "Country",
    name: "country",
    id: "country",
    type: "text",
    placeholder: "Your Country",
    isRequired: true,
    validator: string().required("Country is required"),
  },
  {
    label: "State",
    name: "state",
    id: "state",
    type: "text",
    placeholder: "Your State",
    isRequired: true,
    validator: string().required("State is required"),
  },
  {
    label: "City",
    name: "city",
    id: "city",
    type: "text",
    placeholder: "Your City",
    isRequired: true,
    validator: string().required("City is required"),
  },
  {
    label: "Street Address",
    name: "address",
    id: "address",
    type: "text",
    placeholder: "Your Street Address",
    isRequired: true,
    validator: string().required("Street Address is required"),
  },
  {
    label: "Postcode / ZIP",
    name: "zip",
    id: "zip",
    type: "text",
    placeholder: "Your Postcode / ZIP",
    isRequired: true,
    validator: string().required("Postcode / ZIP is required"),
  },
  {
    label: "Phone",
    name: "phone",
    id: "phone",
    type: "text",
    placeholder: "Your Phone",
    isRequired: true,
    validator: string().required("Phone is required"),
  },
  {
    label: "Email",
    name: "email",
    id: "email",
    type: "text",
    placeholder: "Your Email",
    isRequired: true,
    validator: string().required("Email is required"),
  },
];
