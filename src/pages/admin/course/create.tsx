import FormInput from "@/components/admin/FormInput";
import { FormInputList } from "../../../constants/admin/InputLists/inputLayoutCourse";
import { courseServices } from "@/services/serviceGenerator";
import GenerateMetaData from "@/components/GenerateMetaData";

export default function Create() {
  return (
    <div>
      <GenerateMetaData title="Create Course" desc="Create Course Page" />
      <FormInput
        inputList={FormInputList}
        method="POST"
        service={courseServices}
        title="Create Course"
        toastMessage={{
          success: "Course created successfully",
          error: "Failed to create course"
        }}
      />
    </div>
  );
}

