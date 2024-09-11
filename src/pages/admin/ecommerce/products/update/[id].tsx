'use client';
import React from "react";
import { useRouter } from "next/router";
import FormInput from "@/components/FormInput";
import { FormInputList } from "../inputLayout";
import { productServices } from "@/services/serviceGenerator";

export default function Update() {
  const { query: { id } } = useRouter()

  return (
    <div>
<<<<<<< HEAD
      <FormInput
        inputList={FormInputList}
        service={productServices}
        method="PUT"
        id={id as string}
        title="Update Product"
      />
=======
        <FormInput
          inputList={FormInputList}
          method="PUT"
          id={router.query.id as string}
          service={productServices}
          title="Update Product"
        />
>>>>>>> 9a46efe0347f00c4c583a2399b37b70f6bc8e967
    </div>
  );
}

