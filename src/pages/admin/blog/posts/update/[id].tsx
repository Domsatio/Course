import { useRouter } from "next/router";
import { FormInput } from "@/components/admin/FormInput";
import { postServices } from "@/services/serviceGenerator";
import { FormInputListRenderer } from "../../../../../constants/admin/InputLists/inputLayoutPost";
import GenerateMetaData from "@/components/GenerateMetaData";

export default function Update() {
  const { query: { id } } = useRouter()

  return (
    <div>
      <GenerateMetaData title="Update Post | Admin" desc="Update Post Page" />
      <FormInput
        inputList={FormInputListRenderer({ id: id as string })}
        service={postServices}
        method="PUT"
        id={id as string}
        title="Update Post"
        toastMessage={{
          success: "Post updated successfully",
          error: "Failed to update post",
        }}
      />
    </div>
  );
}

