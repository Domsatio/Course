'use client';
import React from "react";
import FormInput from "@/components/FormInput";
import { FormInputList } from "./inputLayout";
import { categoryServices } from "@/services/serviceGenerator";

export default function Create() {
  return (
    <FormInput
      inputList={FormInputList}
      method="POST"
      service={categoryServices}
      title="Create Category"
      onChange={(e) => {
        console.log(e);
      }}
    />
  );
}

