import { InputListProps } from "@/helpers/typeProps";
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
    name: "price",
    label: "Harga",
    type: "currency",
    validator: Yup.number().required("Harga harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "stock",
    label: "Stok",
    type: "input",
    validator: Yup.number().typeError('Harus angka').required("Stok harus diisi"),
    value: "",
  },
  {
    className: "",
    name: "date",
    label: "Tanggal",
    type: "date",
    validator: Yup.date().required("Tanggal harus diisi"),
    value: "",
  },
  // {
  //   className: "",
  //   name: "category",
  //   label: "Kategori",
  //   type: "select",
  //   validator: Yup.string().required("Kategori harus diisi"),
  //   value: "",
  //   listData: [
  //     { title: "1", value: "1" },
  //     { title: "2", value: "2" },
  //     { title: "3", value: "3" },
  //   ],
  // },
];

export {FormInputList};