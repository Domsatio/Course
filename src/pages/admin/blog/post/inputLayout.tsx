import * as Yup from "yup";
import { InputListProps } from "@/helpers/typeProps";

const FormInputListRenderer = ({ id }: { id: string }) => {
  const FormInputList: InputListProps[] = [
    {
      className: "",
      name: "id",
      label: "ID",
      type: "input",
      hide: true,
      removeOnSubmit: true,
      validator: Yup.string().required("id harus diisi"),
      value: id,
    },
    {
      className: "",
      name: "title",
      label: "Title",
      type: "input",
      removeOnSubmit: false,
      validator: Yup.string().required("title harus diisi"),
      value: "",
    },
    {
      className: "",
      name: "body",
      label: "Body",
      type: "textarea",
      removeOnSubmit: false,
      validator: Yup.string().required("judul harus diisi"),
      value: "",
    },
    {
      className: "input-text",
      name: "category",
      label: "Category",
      type: "multicheckbox",
      removeOnSubmit: false,
      validator: Yup.array().required("Category harus diisi"),
      value: [],
      listData: [
        { title: "1", value: "1" },
        { title: "2", value: "2" },
        { title: "3", value: "3" },
      ],
      option: {
        id: "id",
        type: "multicheckbox",
        params: "name",
        api: "/api/category",
        data: [],
      }
    },
  ];
  return FormInputList;
}
const FormInputList: InputListProps[] = [
  {
    className: "",
    name: "id",
    label: "ID",
    type: "input",
    hide: true,
    removeOnSubmit: true,
    validator: Yup.string().required("id harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "title",
    label: "Title",
    type: "input",
    removeOnSubmit: false,
    validator: Yup.string().required("title harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "body",
    label: "Body",
    type: "textarea",
    removeOnSubmit: false,
    validator: Yup.string().required("judul harus diisi"),
    value: "",
  },
  {
    className: "input-text",
    name: "isi",
    label: "Isi",
    type: "select",
    removeOnSubmit: false,
    validator: Yup.string().required("isi harus diisi"),
    value: "",
    //   listData: [
    //     { title: "1", value: "1" },
    //     { title: "2", value: "2" },
    //     { title: "3", value: "3" },
    //   ],
    option: {
      id: "id",
      type: "select",
      params: "id, name",
      api: "/api/category",
      data: [],
    }
  },
];


export {
  FormInputList,
  FormInputListRenderer
}