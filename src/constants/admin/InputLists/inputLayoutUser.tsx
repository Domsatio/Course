import * as Yup from "yup";
import { InputListProps } from "@/types/form.type";

export const FormInputListRenderer = ({ id }: { id: string }) => {
  const FormInputList: InputListProps[] = [
    {
      className: "",
      name: "userId",
      label: "ID",
      type: "input",
      hide: true,
      validator: Yup.string().required("Id is required"),
      value: id,
    },
    {
      className: "",
      name: "title",
      label: "Title",
      type: "input",
      validator: Yup.string().required("Title is required"),
      value: "",
    },
    {
      className: "",
      name: "body",
      label: "Body",
      type: "textarea",
      validator: Yup.string().required("Body is required"),
      value: "",
    },
    {
      className: "input-text",
      name: "categories",
      label: "Category",
      type: "multicheckbox",
      validator: Yup.array().required("Category is required"),
      value: [],
      option: {
        id: "id",
        type: "multicheckbox",
        query: "skip=0&take=all",
        params: "name",
        api: "/api/category",
        data: [],
      }
    },
    {
      className: "",
      name: "published",
      label: "Published",
      type: "checkbox",
      removeOnSubmit: false,
      validator: Yup.boolean().required("Published is required"),
      value: false,
    }
  ];
  return FormInputList;
}
export const FilterInputList: InputListProps[] = [
  {
    className: "",
    name: "subscribe",
    label: "Subscribe",
    type: "checkbox",
    validator: Yup.boolean().optional(),
    value: "",
    useReset: true,
  }
];