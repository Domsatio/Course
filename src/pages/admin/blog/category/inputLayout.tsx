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
    name: "category",
    label: "Category",
    type: "select",
    validator: Yup.string(),
    value: "",
    option: {
      id: "name",
      params: "name",
      query: "skip=0&take=all",
      type: "select",
      api: "/api/category",
    },
    watch: "name",
  },
  {
    className: "",
    name: "category_special",
    label: "Category special",
    type: "select",
    validator: Yup.string(),
    value: "",
    option: {
      id: "name",
      params: "name",
      query: "skip=0&take=all&name=name&category=category",
      type: "select",
      api: "/api/category",
    },
    watch: "name,category",
  }
];
