import * as Yup from "yup";
import { InputListProps } from "@/types/form.type";

export const FormInputList: InputListProps[] = [
  {
    className: "",
    name: "name",
    label: "Name",
    type: "input",
    validator: Yup.string().required("Name is required"),
    value: "",
  },
  {
    className: "",
    name: "email",
    label: "Email",
    type: "input",
    validator: Yup.string().required("Email is required"),
    value: "",
  },
];
