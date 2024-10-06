import { FormInput } from "@/components/admin/FormInput";
import { FormInputListRenderer } from "../../../../constants/admin/InputLists/inputLayoutPost";
import { useSession } from "next-auth/react";
import { postServices } from "@/services/serviceGenerator";
import GenerateMetaData from "@/components/GenerateMetaData";
import { Fragment } from "react";

export default function Create() {
  const { data: session, status } = useSession();

  return (
    <Fragment>
      <GenerateMetaData title="Create Post | Admin" desc="Create Post Page" />
      {status !== "loading" &&
        <FormInput
          inputList={FormInputListRenderer({ id: session?.user.id || "" })}
          method="POST"
          service={postServices}
          title="Create Post"
          toastMessage={{
            success: "Post created successfully",
            error: "Failed to create post"
          }}
        />
      }
    </Fragment>
  );
}

