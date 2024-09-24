import { useRouter } from "next/router";
import FormInput from "@/components/admin/FormInput";
import { FormInputList } from "../../../../../constants/admin/InputLists/inputLayoutCategory";
import { categoryServices } from "@/services/serviceGenerator";
import GenerateMetaData from "@/components/GenerateMetaData";

export default function Update() {
  const { query: { id } } = useRouter()

  return (
    <div>
      <GenerateMetaData title="Update Category" desc="Update Category Page" />
      <FormInput
        inputList={FormInputList}
        service={categoryServices}
        method="PUT"
        id={id as string}
        title="Update Category"
      />
    </div>
  );
}

