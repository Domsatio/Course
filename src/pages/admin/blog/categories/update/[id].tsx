import { useRouter } from "next/router";
import { FormInput } from "@/components/admin/FormInput";
import { FormInputList } from "../../../../../constants/admin/InputLists/inputLayoutCategory";
import { categoryServices } from "@/services/serviceGenerator";
import GenerateMetaData from "@/components/GenerateMetaData";

export default function Update() {
  const {
    query: { id },
  } = useRouter();

  return (
    <>
      <GenerateMetaData title="Update Category | Account" desc="Update Category Page" />
      <FormInput
        inputList={FormInputList}
        service={categoryServices}
        method="PUT"
        id={id as string}
        title="Update Category"
        toastMessage={{
          success: "Category updated successfully",
          error: "Failed to update category",
        }}
      />
    </>
  );
}
