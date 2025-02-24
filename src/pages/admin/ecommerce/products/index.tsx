"use client";
import React, { useState } from "react";
import { TableActionProps, Table, TableAction, TableCol } from "@/components/admin/TableData";
import { Typography, Avatar } from "@material-tailwind/react";
import { NullProof, numberlistPagination } from "@/helpers/appFunction";
import { productServices } from "@/services/serviceGenerator";
import { GetProduct } from "@/types/product.type";
import {excelLayout} from "@/features/excel/product.excel";
import { tableHeaderProps } from "@/types/table.type";

type DataProps = {
  data: GetProduct[];
  page: number;
  size: number;
}

const TABLE_HEAD: tableHeaderProps[] = [
  { label: "No." },
  { label: "Thumbnail", },
  { label: "Name", visible: true },
  { label: "Description", visible: true },
  { label: "Price", orderBy: "price", visible: true },
  { label: "Discount", orderBy: "discount", visible: true },
  { label: "Quantity", orderBy: "quantity", visible: true },
  { label: "Actions" },
];

export default function Index() {
  const [data, setData] = useState<DataProps>({
    data: [],
    page: 0,
    size: 0,
  });
  
  return (
    <Table
      title="Products"
      description="List of products"
      tableHeader={TABLE_HEAD}
      service={productServices}
      realtimeTable="Product"
      onSuccess={(data: DataProps) => setData(data)}
      exportExcel={(data:any) => excelLayout(data)}
    >
    {NullProof({
      input: data,
      params: "data",
      isMap: true,
    }).map((product: GetProduct, index: number) => {
      const isLast = index === data.data.length - 1;
      const classes = isLast
        ? "p-4 max-h-min"
        : "p-4 max-h-min border-b border-blue-gray-50";
      return (
        <tr key={product.id} className="even:bg-blue-gray-50/50">
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
          <TableCol name='name' className={classes}>
            <Typography variant="small" color="blue-gray" className="font-bold">
              {NullProof({ input: product, params: "name" })}
            </Typography>
          </TableCol>
          <TableCol name='description' className={`${classes} max-w-sm`}>
            <p
              color="blue-gray"
              className="font-normal line-clamp-2 text-sm"
            >
              {NullProof({ input: product, params: "description" })}
            </p>
          </TableCol>
          <TableCol name='price' className={classes}>
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
          </TableCol>
          <TableCol name='discount' className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {product.discount > 0 ? product.discount + "%" : '-'}
            </Typography>
          </TableCol>
          <TableCol name='quantity' className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {NullProof({ input: product, params: "quantity" })}
            </Typography>
          </TableCol>
          <td className={classes}>
            <TableAction data={dataAction} id={product.id} />
          </td>
        </tr>
      );
    })}
    </Table>
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
