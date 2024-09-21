import React, { useState } from "react";
import {
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { GetOrder } from "@/types/order.type";
import TableData, { TableActionProps } from "@/components/admin/TableData";
import { orderServices } from "@/services/serviceGenerator";
import { dateFormater } from "@/helpers/date";
import { NullProof } from "@/helpers/appFunction";

const TABLE_HEAD = [
  "Date",
  "Product",
  "Quantity",
  "Price",
  "Ordered by",
  "Status",
  "Action"
];

export default function Index() {
  const [data, setData] = useState<GetOrder[]>([]);
  const { Table, TableAction } = TableData({
    title: "Orders",
    description: "List of orders",
    tableHeader: TABLE_HEAD,
    onSuccess: (data: GetOrder[]) => setData(data),
    service: orderServices,
  });

  const orderStatus = (status: string) => {
    if (status === "PENDING") {
      return "pink"
    } else if (status === "PROCESSING") {
      return "amber"
    } else if (status === "SHIPPING") {
      return "blue"
    } else if (status === "DELIVERED") {
      return "green"
    } else if (status === "CANCELLED") {
      return "red"
    }
  }

  return (
    <Table>
      {data?.map(({ id, quantity, status, createdAt, user, product }: GetOrder, index: number) => {
        const isLast = index === data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        return (
          <tr key={id}>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {dateFormater(createdAt, "short")}
              </Typography>
            </td>
            <td className={`${classes} flex gap-4 items-center`}>
              <Avatar
                src={product.image}
                alt={product.name}
                size="md"
                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
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
                {quantity}
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
                {user.email}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal flex"
              >
                <Chip
                  variant="ghost"
                  color={orderStatus(status)}
                  size="sm"
                  value={status}
                />
              </Typography>
            </td>
            <td className={classes}>
              <TableAction data={dataAction} id={id} />
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
