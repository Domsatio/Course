import { InputListProps } from "@/types/form.type";
import * as Yup from "yup";

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
    name: "description",
    label: "Description",
    type: "textarea",
    validator: Yup.string().required("Description is required"),
    value: "",
  },
  {
    className: "",
    name: "thumbnail",
    label: "Thumbnail",
    type: "image",
    validator: Yup.string().required("Thumbnail is required"),
    value: "",
  },
  {
    className: "",
    name: "price",
    label: "Price",
    type: "currency",
    validator: Yup.number().required("Price is required"),
    value: "",
  },
  {
    className: "",
    name: "quantity",
    label: "Quantity",
    type: "number",
    validator: Yup.number().typeError('Input should be a number').required("Quantity is required"),
    value: "",
  },
  {
    className: "",
    name: "discount",
    label: "Discount",
    type: "number",
    validator: Yup.number().typeError('Input should be a number').optional().default(0),
    value: 0,
  },
];