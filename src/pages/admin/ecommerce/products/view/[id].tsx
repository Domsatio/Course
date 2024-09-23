import React, { use, useEffect } from "react";
import Image from "next/image";
import { NullProof } from "@/helpers/appFunction";
import { LabelDetailPage, DetailPage } from "@/components/admin/DetailPage";
import { GetServerSideProps } from "next";
import { productServices } from "@/services/serviceGenerator";
import GenerateMetaData from "@/components/GenerateMetaData";

type PageProps = {
  data: any;
};

export default function view({data}: PageProps) {
  const displayDiscount =
    data.discount > 0 ? `${data.discount}%` : "No discount";
  return (
    <DetailPage title="Product">
      <GenerateMetaData title={`Admin | Detail ${NullProof({ input: data, params: "name" })}`} />
      <div className="flex flex-wrap gap-5">
        <Image
          src={data.image}
          alt={NullProof({ input: data, params: "name" })}
          width={400}
          height={400}
          className="rounded-md"
        />
        <div>
          <h1 className="font-black text-xl mb-3 lg:text-4xl lg:mt-2">
            {NullProof({ input: data, params: "name" })}
          </h1>
          <LabelDetailPage label="Description" className="md:max-w-sm lg:max-w-md xl:max-w-xl">
            {NullProof({ input: data, params: "description" })}
          </LabelDetailPage>
          <LabelDetailPage label="Price">
            {NullProof({ input: data, params: "price", type: "currency" })}
          </LabelDetailPage>
          <LabelDetailPage label="Stock">
            {NullProof({ input: data, params: "quantity" })}
          </LabelDetailPage>
          <LabelDetailPage label="Discount">{displayDiscount}</LabelDetailPage>
        </div>
      </div>
    </DetailPage>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const res = await productServices.getItem({ id: id });
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
