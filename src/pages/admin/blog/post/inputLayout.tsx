import * as Yup from "yup";
import { InputListProps } from "@/helpers/typeProps";


const FormInputList: InputListProps[] = [
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
    type: "multicheckbox",
    removeOnSubmit: false,
    validator: Yup.string().required("isi harus diisi"),
    value: "",
    listData: [
      { title: "1", value: "1" },
      { title: "2", value: "2" },
      { title: "3", value: "3" },
    ],
    option: {
      id: "id",
      type: "multicheckbox",
      api: "/api/category",
      data: [],
      value: "",
    }
  },
];


export {
  FormInputList
}