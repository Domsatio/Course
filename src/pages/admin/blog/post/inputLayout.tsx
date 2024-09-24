import * as Yup from "yup";
import { InputListProps } from "@/types/form.type";

export const FormInputListRenderer = ({ id }: { id: string }) => {
  const FormInputList: InputListProps[] = [
    {
      name: "userId",
      label: "ID",
      type: "input",
      hide: true,
      validator: Yup.string().required("Id is required"),
      value: id,
      isRequired: true,
    },
    {
      name: "title",
      label: "Title",
      type: "input",
      validator: Yup.string().required("Title is required"),
      value: "",
      placeholder: "Input title here",
      isRequired: true,
    },
    {
      className: "mt-7",
      name: "body",
      label: "Body",
      type: "textarea",
      validator: Yup.string().required("Body is required"),
      value: "",
      placeholder: "Input body here",
      isRequired: true,
    },
    {
      className: "mt-7",
      name: "thumbnail",
      label: "Thumbnail",
      type: "image",
      validator: Yup.string().required("Thumbnail is required"),
      value: "",
      isRequired: true,
    },
    {
      className: "input-text mt-7",
      name: "categories",
      label: "Category",
      type: "multicheckbox",
      validator: Yup.array().optional(),
      value: [],
      valueID: 'categoryId',
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
      className: "mt-7",
      name: "published",
      label: "Published",
      type: "checkbox",
      removeOnSubmit: false,
      validator: Yup.boolean().required("Published is required").default(false),
      value: false,
    }
  ];
  return FormInputList;
}
export const FilterInputList: InputListProps[] = [
  {
    className: "",
    name: "published",
    label: "Published",
    type: "checkbox",
    validator: Yup.boolean().optional(),
    value: "",
    useReset: true,
  },
  {
    className: "input-text",
    name: "category",
    label: "Category",
    type: "select",
    validator: Yup.string().required("Category is required"),
    value: [],
    option: {
      id: "name",
      params: "name",
      type: "select",
      query: "skip=0&take=all",
      api: "/api/category",
      data: [],
    }
  },
];