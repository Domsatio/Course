import { NullProof } from "@/helpers/appFunction";
import { DetailPage, LabelDetailPage } from "@/components/admin/DetailPage";
import { userServices } from "@/services/serviceGenerator";
import { GetServerSideProps } from "next/types";
import { User } from "@/types/user.type";
import GenerateMetaData from "@/components/GenerateMetaData";

export default function view({ data }: {data: User}) {
  return (
    <DetailPage title="User">
      <GenerateMetaData title="User" desc="Detail User Page" />
      <div>
        <LabelDetailPage label="Name">
          {NullProof({ input: data, params: "name" })}
        </LabelDetailPage>
        <LabelDetailPage label="Email">
          {NullProof({ input: data, params: "email" })}
        </LabelDetailPage>
      </div>
    </DetailPage>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const res = await userServices.getItem({ id: id });
    return {
      props: {
        data: res.data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: {},
      },
    };
  }
};
