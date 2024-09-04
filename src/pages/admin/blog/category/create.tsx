'use client';
import React from "react";
import FormInput from "@/components/FormInput";
import { FormInputList } from "./inputLayout";

export default function tambah() {
  return (
    <FormInput
      inputList={FormInputList}
      route={{ url: `/category`, query: {}, method: "POST" }}
      title="Create Category"
    />
  );
}

