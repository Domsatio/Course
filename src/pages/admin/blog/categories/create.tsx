import { FormInput } from "@/components/admin/FormInput";
import { FormInputList } from "../../../../constants/admin/InputLists/inputLayoutCategory";
import { categoryServices } from "@/services/serviceGenerator";
import GenerateMetaData from "@/components/GenerateMetaData";
import { Fragment } from "react";

export default function Create() {
  return (
    <Fragment>
      <GenerateMetaData title="Create Category" desc="Create Category Page" />
      <FormInput
        inputList={FormInputList}
        method="POST"
        service={categoryServices}
        title="Create Category"
        toastMessage={{
          success: "Category created successfully",
          error: "Failed to create category",
        }}
      />
    </Fragment>
  );
}
