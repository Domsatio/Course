"use client";
import React, { useState, useEffect } from "react";
import TableData from "@/components/TableData";
import { TableActionProps } from "@/components/TableData";
import { DATA_PRODUCTS } from "@/helpers/dummyData";
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
import { useRouter } from "next/router";

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
  const router = useRouter();
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
                {product.price}
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
              {/* <Tooltip content="Edit User">
                <IconButton variant="text" onClick={()=> router.push(router.pathname + "/update/" + product.id)}>
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip> */}
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
      console.log("custom action");
    },
    custom: {
      label: "Custom",
      icon: <PencilIcon className="h-4 w-4" />,
    },
  },
];
