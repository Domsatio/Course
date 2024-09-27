import { useRouter } from "next/router";
import { FormInput } from "@/components/admin/FormInput";
import { postServices } from "@/services/serviceGenerator";
import { FormInputListRenderer } from "../inputLayout";

export default function Update() {
  const { query: { id } } = useRouter()

  return (
    <div>
      <FormInput
        inputList={FormInputListRenderer({ id: id as string })}
        service={postServices}
        method="PUT"
        id={id as string}
        title="Update Post"
        toastMessage={{
          success: "Data updated successfully",
          error: "Failed to update data",
        }}
      />
    </div>
  );
}

