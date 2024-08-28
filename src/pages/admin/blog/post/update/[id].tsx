'use client';
import React, {useState} from "react";
import { useRouter } from "next/router";
import FormInput from "@/components/FormInput";
import { FormInputList } from "../inputLayout";


export default function tambah() {
  const router = useRouter()
  console.log(router.query.id);
  
    
  return (
    <div>
        <FormInput
          inputList={FormInputList}
          route={{ url: `/api/post`, query: {id:router.query.id || ""}, method: "PUT" }}
          title="Update Post"
        />
    </div>
  );
}

