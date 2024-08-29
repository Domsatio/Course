import * as Yup from "yup";
import { InputListProps } from "@/helpers/typeProps";

const FormInputList: InputListProps[] = [
  {
    className: "",
    name: "title",
    label: "Title",
    type: "input",
    validator: Yup.string().required("Nama harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "description",
    label: "Description",
    type: "textarea",
    validator: Yup.string().required("Deskripsi harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "video",
    label: "Video",
    type: "url",
    validator: Yup.string().required("Nama harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "published",
    label: "Dipublikasikan",
    type: "select",
    validator: Yup.string().required("Pilihan harus diisi"),
    value: "",
    listData: [
      { title: "Yes", value: "yes" },
      { title: "No", value: "no" },
    ],
  }
];


export {
  FormInputList,
}