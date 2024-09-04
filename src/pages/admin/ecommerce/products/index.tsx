"use client";
import React, { useState} from "react";
import TableData from "@/components/TableData";
import { TableActionProps } from "@/components/TableData";
import { ProductProps } from "@/helpers/typeProps";
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

const TABLE_HEAD = [
  "Name",
  "Description",
  "Price",
  "Discount",
  "Quantity",
  "Action",
];

export default function index() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  console.log(modal, "modal");

  const dataAction: TableActionProps[] = [
    {
      action: "update",
    },
    {
      action: "delete",
    },
    {
      action: "view",
    },
    {
      action: "custom",
      onClick: () => {
        setModal(prev => !prev);
      },
      custom: {
        label: "Custom",
        icon: <PencilIcon className="h-4 w-4" />,
      },
    },
  ];

  const { Table, TableAction } = TableData({
    title: "Products",
    description: "List of products",
    tableHeader: TABLE_HEAD,
    urlData: "/product",
    onSuccess: (data) => setData(data),
  });
  return (
    <Table>
      {data?.map((product: ProductProps, index: number) => {
        const isLast = index === data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        return (
          <tr key={product.id}>
            <td className={classes}>
              <div className="flex items-center gap-3">
                <Avatar
                  src={product.image}
                  alt={product.name}
                  size="md"
                  className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                />
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  {product.name}
                </Typography>
              </div>
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
                {NullProof({input:product, params: "price", type: "currency"})}
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


