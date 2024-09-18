'use client';
import React from "react";
import FormInput from "@/components/admin/FormInput";
import { FormInputList } from "./inputLayout";
import { courseServices } from "@/services/serviceGenerator";

export default function Create() {
  return (
    <div>
      <FormInput
        inputList={FormInputList}
        method="POST"
        service={courseServices}
        title="Create Course"
      />
    </div>
  );
}

