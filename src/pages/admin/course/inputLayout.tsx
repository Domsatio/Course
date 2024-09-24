import * as Yup from "yup";
import { InputListProps } from "@/types/form.type";

export const FormInputList: InputListProps[] = [
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
    name: "description",
    label: "Description",
    type: "textarea",
    validator: Yup.string().required("Description is required"),
    value: "",
    placeholder: "Input description here",
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
    className: "mt-7",
    name: "video",
    label: "Video",
    type: "component",
    validator: Yup.array().required("Video is required"),
    value: "",
    isRequired: true,
    component: [
      {
        name: "video",
        label: "Video Link",
        type: "input",
        validator: Yup.string().required("Video is required"),
        value: "",
        placeholder: "Input video link here",
        isRequired: true,
      },
      {
        name: "description",
        label: "Video Description",
        type: "textarea",
        validator: Yup.string().required("Description is required"),
        value: "",
        placeholder: "Input video description here",
        isRequired: true,
      },
      {
        name: "file",
        label: "Attachment",
        type: "file",
        validator: Yup.string().required("File is required"),
        value: "",
        isRequired: true,
      },
    ]
  },
  {
    className: "mt-7",
    name: "published",
    label: "Published",
    type: "checkbox",
    validator: Yup.boolean().required("Published is required").default(false),
    value: false,
  },
];

export const FilterInputList: InputListProps[] = [
  {
    className: "",
    name: "published",
    label: "Published",
    type: "checkbox",
    validator: Yup.boolean().required("Published is required"),
    value: "",
    useReset: true,
  },
];