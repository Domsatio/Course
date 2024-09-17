import * as Yup from "yup";
import { InputListProps } from "@/helpers/typeProps";

export const FormInputListRenderer = ({ id }: { id: string }) => {
  const FormInputList: InputListProps[] = [
    {
      className: "",
      name: "userId",
      label: "ID",
      type: "input",
      hide: true,
      removeOnSubmit: true,
      validator: Yup.string().required("Id is required"),
      value: id,
    },
    {
      className: "",
      name: "title",
      label: "Title",
      type: "input",
      removeOnSubmit: false,
      validator: Yup.string().required("Title is required"),
      value: "",
    },
    {
      className: "",
      name: "body",
      label: "Body",
      type: "textarea",
      removeOnSubmit: false,
      validator: Yup.string().required("Body is required"),
      value: "",
    },
    {
      className: "input-text",
      name: "categories",
      label: "Category",
      type: "multicheckbox",
      removeOnSubmit: false,
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
      listData: [
        { title: "Yes", value: true },
        { title: "No", value: false },
      ],
    }
  ];
  return FormInputList;
}
export const FilterInputList: InputListProps[] = [
  {
    className: "",
    name: "published",
    label: "Dipublikasikan",
    type: "checkbox",
    validator: Yup.string(),
    value: "",
    useRiset: true,
    listData: [
      { title: "Yes", value: true },
      { title: "No", value: false },
    ],
  },
  {
    className: "",
    name: "category",
    label: "Category",
    type: "multicheckbox",
    validator: Yup.array().required("Category is required"),
    useRiset: true,
    value: "",
    option: {
      id: "name",
      params: "name",
      query: "skip=0&take=all",
      type: "select",
      api: "/api/category",
    }
  },
];