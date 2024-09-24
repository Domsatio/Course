'use client';
import React from "react";
import FormInput from "@/components/admin/FormInput";
import { FormInputListRenderer } from "../../../../constants/admin/InputLists/inputLayoutPost";
import { useSession } from "next-auth/react";
import { postServices } from "@/services/serviceGenerator";
import GenerateMetaData from "@/components/GenerateMetaData";

export default function Create() {
  const { data: session, status } = useSession();

  return (
    <>
      <GenerateMetaData title="Create Post" desc="Create Post Page" />
      {status !== "loading" &&
        <FormInput
          inputList={FormInputListRenderer({ id: session?.user.id || "" })}
          method="POST"
          service={postServices}
          title="Create Post"
        />
      }
    </>
  );
}

