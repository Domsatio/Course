import { FormInput } from "@/components/admin/FormInput";
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
          toastMessage={{
            success: "Data created successfully",
            error: "Failed to create data"
          }}
        />
      }
    </>
  );
}

