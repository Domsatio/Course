'use client';
import React, {useState} from "react";
import { useRouter } from "next/router";
import FormInput from "@/components/FormInput";
import { FormInputList } from "../inputLayout";
import { productServices } from "@/services/serviceGenerator";


export default function tambah() {
  const router = useRouter()  
    
  return (
    <div>
        <FormInput
          inputList={FormInputList}
          method="PUT"
          id={router.query.id as string}
          service={productServices}
          title="Update Product"
        />
    </div>
  );
}

