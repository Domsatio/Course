import { useRouter } from "next/router";
import FormInput from "@/components/admin/FormInput";
import { FormInputList } from "../../../../constants/admin/InputLists/inputLayoutCourse";
import { courseServices } from "@/services/serviceGenerator";
import GenerateMetaData from "@/components/GenerateMetaData";

export default function Update() {
  const { query: { id } } = useRouter()

  return (
    <div>
      <GenerateMetaData title="Update Course" desc="Update Course Page" />
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

