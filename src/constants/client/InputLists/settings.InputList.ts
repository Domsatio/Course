import { InputRenderProps } from "@/components/client/InputRender";
import { Schema, string } from "yup";

interface InputListProps extends InputRenderProps {
  validator: Schema<any>;
}

export const InputList: InputListProps[] = [
  {
    label: "Name",
    name: "name",
    id: "name",
    type: "text",
    placeholder: "Your Name",
    isRequired: true,
    validator: string().required("Name is required"),
  },
  {
    label: "Email",
    name: "email",
    id: "email",
    type: "email",
    placeholder: "name@mail.com",
    isRequired: true,
    validator: string().email("Invalid email").required("Email is required"),
  },
  {
    label: "Current Password (leave blank to leave unchanged)",
    name: "currentPassword",
    id: "currentPassword",
    type: "password",
    placeholder: "Current Password",
    validator: string().optional(),
  },
  {
    label: "New Password (leave blank to leave unchanged)",
    name: "newPassword",
    id: "newPassword",
    type: "password",
    placeholder: " New Password",
    validator: string().optional(),
  },
  {
    label: "Confirm New Password",
    name: "confirmNewPassword",
    id: "confirmNewPassword",
    type: "password",
    placeholder: "Confirm New Password",
    validator: string().optional(),
  },
];
