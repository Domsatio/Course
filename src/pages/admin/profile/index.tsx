import React from "react";
import { Card } from "@material-tailwind/react";
import FormInput from "@/components/admin/FormInput";
import { FormInputList } from "../../../constants/admin/InputLists/inputLayoutProfile";
import { userServices } from "@/services/serviceGenerator";
import { useSession } from "next-auth/react";

const Index = () => {
  const { data: session } = useSession();

  return (
    <Card className="w-full flex flex-col gap-5 p-10 text-[#161931]">
      <h2 className="text-2xl font-bold sm:text-xl">
        Admin Profile
      </h2>

      <div className="items-center text-[#202142]">
        <FormInput
          id={session?.user?.id}
          inputList={FormInputList}
          method="PUT"
          service={userServices}
          isUseCancelButton={false}
          customCard={(children: React.ReactNode) => (
            <React.Fragment>
              {children}
            </React.Fragment>
          )}
          toastMessage={{
            success: "Profile updated successfully",
            error: "Profile update failed"
          }}
        />
      </div>
    </Card>
  );
};

export default Index;
