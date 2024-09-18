import { useRouter } from "next/router";
import FormInput from "@/components/admin/FormInput";
import { FormInputList } from "../inputLayout";
import { categoryServices } from "@/services/serviceGenerator";

export default function Update() {
  const { query: { id } } = useRouter()

  return (
    <div>
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

