"use client";
import React, { useState, useEffect } from "react";
import TableData from "@/components/TableData";
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

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];

export default function index() {
  const [data, setData] = useState([]);
  return (
    <TableData
      title="Products"
      description="List of products"
      tableHeader={TABLE_HEAD}
      dummyData={DATA_PRODUCTS}
      urlData="https://dummyjson.com/posts"
      onSuccess={(data) => setData(data)}
    >
      {/* {children} */}
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
                {product.price}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {product.date}
              </Typography>
            </td>
            <td className={classes}>
              <div className="w-max">
                <Chip
                  size="sm"
                  variant="ghost"
                  value={status}
                  color={
                    status === "paid"
                      ? "green"
                      : status === "pending"
                        ? "amber"
                        : "red"
                  }
                />
              </div>
            </td>
            <td className={classes}>
              <div className="flex items-center gap-3">
                <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                  <Avatar
                    src={
                      product.account === "visa"
                        ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                        : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                    }
                    size="sm"
                    alt={product.account}
                    variant="square"
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal capitalize"
                  >
                    {product.account.split("-").join(" ")} {product.rating}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {product.createdAt}
                  </Typography>
                </div>
              </div>
            </td>
            <td className={classes}>
              <Tooltip content="Edit User">
                <IconButton variant="text">
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
        );
      })}
    </TableData>
  );
}
