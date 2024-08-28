'use client';
import React, {useState} from "react";
import { useRouter } from "next/router";
import FormInput from "@/components/FormInput";
import { FormInputList } from "../inputLayout";


export default function tambah() {
  const router = useRouter()
  return (
    <div>
        <FormInput
          inputList={FormInputList}
          route={{ url: `/api/category`, query: {id:router.query.id || ""}, method: "PUT" }}
          title="Update Category"
        />
    </div>
  );
}

