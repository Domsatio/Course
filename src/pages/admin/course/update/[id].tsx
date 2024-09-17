import { useRouter } from "next/router";
import FormInput from "@/components/FormInput";
import { FormInputList } from "../inputLayout";
import { courseServices } from "@/services/serviceGenerator";

export default function Update() {
  const { query: { id } } = useRouter()

  return (
    <div>
      <FormInput
        inputList={FormInputList}
        service={courseServices}
        method="PUT"
        id={id as string}
        title="Update Course"
      />
    </div>
  );
}

