import * as Yup from "yup";
import { InputListProps } from "@/types/form.type";

export const FormInputList: InputListProps[] = [
  {
    name: "name",
    label: "Name",
    type: "input",
    validator: Yup.string().required("Name is required"),
    value: "",
    placeholder: "Input name here",
    isRequired: true,
  },
];
