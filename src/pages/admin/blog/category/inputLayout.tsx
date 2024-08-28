import * as Yup from "yup";
import { InputListProps } from "@/helpers/typeProps";

const FormInputList: InputListProps[] = [
    {
      className: "",
      name: "name",
      label: "Nama",
      type: "input",
      validator: Yup.string().required("Nama harus diisi"),
      value: "",
    },
  ];
  

export {
    FormInputList,
}