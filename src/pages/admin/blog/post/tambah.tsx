'use client';
import React from "react";
import FormInput from "@/components/FormInput";
import { FormInputList, FormInputListRenderer } from "./inputLayout";
import { useSession } from "next-auth/react"; 

export default function tambah() {
  const { data: session, status } = useSession();
  return (
    <div>
      {status !== "loading" &&
        <FormInput
          inputList={FormInputListRenderer({id: session?.user.id || ""})}
          route={{ url: "/post", query: {}, method: "POST" }}
          title="Tambah Post"
        />

      }
    </div>
  );
}

