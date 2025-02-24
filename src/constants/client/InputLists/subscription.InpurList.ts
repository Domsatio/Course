import { InputListProps } from "@/types/form.type";
import * as Yup from "yup";

export const InputList: InputListProps[] = [
  {
    className: "md:basis-1/2",
    name: "card_number",
    type: "number",
    validator: Yup.number().required("Card number is required"),
    value: "",
    placeholder: "Card number",
    isRequired: true,
  },
  {
    className: "md:basis-1/2",
    name: "card_cvv",
    type: "number",
    validator: Yup.number().required("Card cvv is required"),
    value: "",
    placeholder: "Card cvv",
    isRequired: true,
  },
  {
    className: "md:basis-1/2",
    name: "card_exp_month",
    type: "number",
    validator: Yup.number().required("Card expiry month is required"),
    value: "",
    placeholder: "Card expiry month",
    isRequired: true,
  },
  {
    className: "md:basis-1/2",
    name: "card_exp_year",
    type: "number",
    validator: Yup.number().required("Card expiry year is required"),
    value: "",
    placeholder: "Card expiry year",
    isRequired: true,
  },
  {
    name: "bank_one_time_token",
    type: "number",
    validator: Yup.number().required("Bank one time token is required"),
    value: "",
    placeholder: "Bank one time token",
    isRequired: true,
  },
];
