'use client';
import React from "react";
import FormInput from "@/component/FormInput";
import { FormInputList } from "./inputLayout";

export default function tambah() {
  return (
    <div>
        <FormInput
          inputList={FormInputList}
          route={{ url: "/api/post", query: {}, method: "POST" }}
          title="Tambah Post"
        />
    </div>
  );
}

