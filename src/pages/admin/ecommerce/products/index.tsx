"use client";
import React, { useState } from "react";
import TableData from "@/components/admin/TableData";
import { TableActionProps } from "@/components/admin/TableData";
import { Typography, Avatar } from "@material-tailwind/react";
import { NullProof, numberlistPagination } from "@/helpers/appFunction";
import { productServices } from "@/services/serviceGenerator";
import { GetProduct } from "@/types/product.type";

type DataProps = {
  data: GetProduct[];
  page: number;
  size: number;
}

const TABLE_HEAD = [
  "No",
  "Thumbnail",
  "Name",
  "Description",
  "Price",
  "Discount",
  "Quantity",
  "Action",
];

export default function Index() {
  const [data, setData] = useState<DataProps>({
    data: [],
    page: 0,
    size: 0,
  });
  const { Table, TableAction } = TableData({
    title: "Products",
    description: "List of products",
    tableHeader: TABLE_HEAD,
    realtimeTable: "Product",
    onSuccess: (data: DataProps) => setData(data),
    service: productServices,
  });

  return Table(
    NullProof({
      input: data,
      params: "data",
      isMap: true,
    }).map((product: GetProduct, index: number) => {
      const isLast = index === data.data.length - 1;
      const classes = isLast
        ? "p-4 max-h-min"
        : "p-4 max-h-min border-b border-blue-gray-50";
      return (
        <tr key={product.id}>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {numberlistPagination({
                n: index,
                p: data?.page,
                t: data?.size,
              })}
              .
            </Typography>
          </td>
          <td className={classes}>
            <Avatar
              src={product.thumbnail}
              alt={product.name}
              size="md"
              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
            />
          </td>
          <td className={classes}>
            <Typography variant="small" color="blue-gray" className="font-bold">
              {NullProof({ input: product, params: "name" })}
            </Typography>
          </td>
          <td className={`${classes} max-w-sm`}>
            <p
              color="blue-gray"
              className="font-normal line-clamp-2 text-sm"
            >
              {NullProof({ input: product, params: "description" })}
            </p>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {NullProof({
                input: product,
                params: "price",
                type: "currency",
              })}
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {product.discount > 0 ? product.discount + "%" : '-'}
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {NullProof({ input: product, params: "quantity" })}
            </Typography>
          </td>
          <td className={classes}>
            <TableAction data={dataAction} id={product.id} />
          </td>
        </tr>
      );
    })
  );
}

const dataAction: TableActionProps[] = [
  {
    action: "view",
  },
  {
    action: "update",
  },
  {
    action: "delete",
  },
];
