import { InputListProps } from "@/types/form.type";
import * as Yup from "yup";

export const InputList: InputListProps[] = [
  {
    name: "name",
    type: "input",
    validator: Yup.string().required("Name is required"),
    value: "",
    placeholder: "Name",
    isRequired: true,
  },
  {
    name: "email",
    type: "input",
    validator: Yup.string().required("Email is required"),
    value: "",
    placeholder: "Email",
    isRequired: true,
  },
  {
    name: "message",
    type: "textarea",
    validator: Yup.string().required("Message is required"),
    value: "",
    placeholder: "Message",
    isRequired: true,
  },
];
