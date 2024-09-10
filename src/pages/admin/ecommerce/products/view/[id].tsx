import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { DetailPage, NullProof } from "@/helpers/appFunction";

export default function view() {
  const { Page, Label, data } = DetailPage({
    api: "/product",
  });
  return (
    <Page title="Product">
      <div className="flex flex-wrap gap-5">
        <div>
          <Image
            src={data.image}
            alt={NullProof({ input: data, params: "name" })}
            width={400}
            height={400}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-black text-xl lg:text-3xl">
              {NullProof({ input: data, params: "name" })}
            </h1>
          </div>
          <Label label="Description" position="vertikal">
            {NullProof({ input: data, params: "description" })}
          </Label>
          <Label label="Price" position="vertikal">
            {NullProof({ input: data, params: "price", type: "currency" })}
          </Label>
          <Label label="Stock" position="vertikal">
            {NullProof({ input: data, params: "quantity" })}
          </Label>
          <Label label="Discount" position="vertikal">
            {NullProof({ input: data, params: "discount" })}{NullProof({ input: data, params: "discount" }) > 0 ? "%" : ""}
          </Label>
        </div>
      </div>
    </Page>
  );
}
