import { InputListProps } from "@/helpers/typeProps";
import { Form } from "formik";
import * as Yup from "yup";

const FormInputList: InputListProps[] = [
  {
    className: "",
    name: "name",
    label: "Nama",
    type: "input",
    validator: Yup.string().required("Nama harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "description",
    label: "Deskripsi",
    type: "textarea",
    validator: Yup.string().required("Deskripsi harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "image",
    label: "Gambar",
    type: "image",
    validator: Yup.mixed().required("Gambar harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "price",
    label: "Harga",
    type: "currency",
    validator: Yup.number().required("Harga harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "quantity",
    label: "Stok",
    type: "number",
    validator: Yup.number().typeError('Harus angka').required("Stok harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "discount",
    label: "Diskon",
    type: "number",
    validator: Yup.number().typeError('Harus angka'),
    value: "",
  },

  // {
  //   className: "",
  //   name: "date",
  //   label: "Tanggal",
  //   type: "date",
  //   validator: Yup.date().required("Tanggal harus diisi"),
  //   value: "",
  // },
  // {
  //   className: "",
  //   name: "published",
  //   label: "Dipublikasikan",
  //   type: "select",
  //   validator: Yup.string().required("Pilihan harus diisi"),
  //   value: "",
  //   listData: [
  //     { title: "Yes", value: "yes" },
  //     { title: "No", value: "no" },
  //   ],
  // }
];

export {FormInputList};