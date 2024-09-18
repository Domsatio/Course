'use client';
import React from "react";
import { useRouter } from "next/router";
import FormInput from "@/components/admin/FormInput";
import { FormInputList } from "../inputLayout";
import { postServices } from "@/services/serviceGenerator";

export default function Update() {
  const { query: { id } } = useRouter()

  return (
    <div>
      <FormInput
        inputList={FormInputList}
        service={postServices}
        method="PUT"
        id={id as string}
        title="Update Post"
      />
    </div>
  );
}

