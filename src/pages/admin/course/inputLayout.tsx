import * as Yup from "yup";
import { InputListProps } from "@/types/form.type";

export const FormInputList: InputListProps[] = [
  {
    className: "",
    name: "title",
    label: "Title",
    type: "input",
    validator: Yup.string().required("Name is required"),
    value: "",
  },
  {
    className: "",
    name: "description",
    label: "Description",
    type: "textarea",
    validator: Yup.string().required("Description is required"),
    value: "",
  },
  {
    className: "",
    name: "image",
    label: "Image",
    type: "component",
    validator: Yup.array().required("Image is required"),
    value: "",
    component: [
      {
        className: "",
        name: "image",
        label: "Image",
        type: "image",
        validator: Yup.string().required("Image description is required"),
        value: "",
      },
    ]
  },
  {
    className: "",
    name: "video",
    label: "Video",
    type: "component",
    validator: Yup.array().required("Video is required"),
    value: "",
    component: [
      {
        className: "",
        name: "video",
        label: "Video",
        type: "input",
        validator: Yup.string().required("Video is required"),
        value: "",
      },
      {
        className: "",
        name: "description",
        label: "Video Description",
        type: "textarea",
        validator: Yup.string().required("Video description is required"),
        value: "",
      },
      {
        className: "",
        name: "file",
        label: "Materi PDF",
        type: "file",
        validator: Yup.string().required("Gambar harus diisi"),
        value: "",
      },
    ]
  },
  {
    className: "",
    name: "published",
    label: "Published",
    type: "checkbox",
    validator: Yup.string().required("Published is required"),
    value: "",
    listData: [
      { title: "Yes", value: true },
      { title: "No", value: false },
    ],
  }
];

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
];