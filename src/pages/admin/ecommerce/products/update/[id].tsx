'use client';
import React from "react";
import { useRouter } from "next/router";
import FormInput from "@/components/admin/FormInput";
import { FormInputList } from "../inputLayout";
import { productServices } from "@/services/serviceGenerator";
import GenerateMetaData from "@/components/GenerateMetaData";

export default function Update() {
  const { query: { id } } = useRouter()

  return (
    <div>
      <GenerateMetaData title="Update Product" desc="Update Product Page" />
      <FormInput
        inputList={FormInputList}
        service={productServices}
        method="PUT"
        id={id as string}
        title="Update Product"
      />
    </div>
  );
}
