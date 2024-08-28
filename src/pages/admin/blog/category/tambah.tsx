'use client';
import React, {useState} from "react";
import { useRouter } from "next/router";
import FormInput from "@/components/FormInput";
import { FormInputList } from "./inputLayout";


export default function tambah() {
  return (
    <div>
        <FormInput
          inputList={FormInputList}
          route={{ url: `/category`, query: {}, method: "POST" }}
          title="Tamabh Category"
        />
    </div>
  );
}

