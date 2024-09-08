'use client';
import React from "react";
import FormInput from "@/components/FormInput";
import { FormInputListRenderer } from "./inputLayout";
import { useSession } from "next-auth/react";
import { postServices } from "@/services/serviceGenerator";

export default function Create() {
  const { data: session, status } = useSession();

  return (
    <>
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

