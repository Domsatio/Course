import * as Yup from "yup";
import { InputListProps } from "@/types/form.type";

export const FormInputList: InputListProps[] = [
  {
    className: "",
    name: "title",
    label: "Title",
    type: "input",
    validator: Yup.string().required("Title is required"),
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
    name: "thumbnail",
    label: "Thumbnail",
    type: "image",
    validator: Yup.string().required("Thumbnail is required"),
    value: "",
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
        label: "Video Link",
        type: "input",
        validator: Yup.string().required("Video is required"),
        value: "",
      },
      {
        className: "",
        name: "description",
        label: "Video Description",
        type: "textarea",
        validator: Yup.string(),
        value: "",
      },
      {
        className: "",
        name: "file",
        label: "Attachment",
        type: "file",
        validator: Yup.string(),
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
  },
  {
    className: "",
    name: "slug",
    label: "Slug",
    type: "input",
    validator: Yup.string().required("Slug is required"),
    value: "",
  },
];

export const FilterInputList: InputListProps[] = [
  {
    className: "",
    name: "published",
    label: "Published",
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