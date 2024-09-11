"use client";
import React, { useState } from "react";
import TableData from "@/components/TableData";
import { TableActionProps } from "@/components/TableData";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  rating,
} from "@material-tailwind/react";
import { NullProof } from "@/helpers/appFunction";
import { productServices } from "@/services/serviceGenerator";
import { GetProduct } from "@/types/product.type";

const TABLE_HEAD = [
  "Image",
  "Name",
  "Description",
  "Price",
  "Discount",
  "Quantity",
  "Action",
];

export default function Index() {
  const [data, setData] = useState<GetProduct[]>([]);

  const { Table, TableAction } = TableData({
    title: "Products",
    description: "List of products",
    tableHeader: TABLE_HEAD,
    onSuccess: (data: GetProduct[]) => setData(data),
    service: productServices,
  });
  return (
    <Table>
      {data?.map((product: GetProduct, index: number) => {
        const isLast = index === data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        return (
          <tr key={product.id}>
            <td className={classes}>
              <Avatar
                src={product.image}
                alt={product.name}
                size="md"
                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
              />
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                {product.name}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {product.description}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {NullProof({ input: product, params: "price", type: "currency" })}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {product.discount}%
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {product.quantity}
              </Typography>
            </td>
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


