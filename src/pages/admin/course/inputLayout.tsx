import * as Yup from "yup";
import { InputListProps } from "@/helpers/typeProps";

export const FormInputList: InputListProps[] = [
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
    name: "image",
    label: "Image",
    type: "component",
    validator: Yup.array().required("Nama harus diisi"),
    value: "",
    component: [
      {
        className: "",
        name: "image",
        label: "Image",
        type: "image",
        validator: Yup.string().required("Gambar harus diisi"),
        value: "",
      },
    ]
  },
  {
    className: "",
    name: "video",
    label: "Video",
    type: "component",
    validator: Yup.array().required("Nama harus diisi"),
    value: "",
    component: [
      {
        className: "",
        name: "video",
        label: "Video",
        type: "input",
        validator: Yup.string().required("Vidio harus diisi"),
        value: "",
      },
    ]
  },
  {
    className: "",
    name: "published",
    label: "Dipublikasikan",
    type: "select",
    validator: Yup.string().required("Pilihan harus diisi"),
    value: "",
    listData: [
      { title: "Yes", value: true },
      { title: "No", value: false },
    ],
  }
];
