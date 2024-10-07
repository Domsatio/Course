import React, { useState } from "react";
import {
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { Order } from "@/types/order.type";
import TableData, { TableActionProps } from "@/components/admin/TableData";
import { orderServices } from "@/services/serviceGenerator";
import { dateFormater } from "@/utils/date";
import { NullProof } from "@/helpers/appFunction";

type DataProps = {
  data: Order[];
  page: number;
  size: number;
}

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
  const [data, setData] = useState<DataProps>({
    data: [],
    page: 0,
    size: 0,
  });
  const { Table, TableAction } = TableData({
    title: "Orders",
    description: "List of orders",
    tableHeader: TABLE_HEAD,
    realtimeTable: "Order",
    onSuccess: (data: DataProps) => setData(data),
    service: orderServices,
  });

//   const orderStatus = (status: string) => {
//     if (status === "PENDING") {
//       return "pink"
//     } else if (status === "PROCESSING") {
//       return "amber"
//     } else if (status === "SHIPPING") {
//       return "blue"
//     } else if (status === "DELIVERED") {
//       return "green"
//     } else if (status === "CANCELLED") {
//       return "red"
//     }
//   }

  return Table(
    NullProof({
      input: data,
      params: "data",
      isMap: true,
    }).map((order: Order, index: number) => {
      const isLast = index === data.data.length - 1;
      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      return (
        <tr key={order.id}>
          {/* <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {NullProof({ input: order, params: "date" })}
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {NullProof({ input: order, params: "product" }).name}
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {NullProof({ input: order, params: "quantity" })}
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {NullProof({ input: order, params: "price" })}
            </Typography>
          </td>
          <td className={classes}>
            <div className="flex items-center">
              <Avatar
                src={NullProof({ input: order, params: "user" }).avatar}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal ml-2"
              >
                {NullProof({ input: order, params: "user" }).name}
              </Typography>
            </div>
          </td>
          <td className={classes}>
            <Chip
              value={order.transactionStatus}
            />
          </td> */}
          <td className={classes}>
            {TableAction({ data: dataAction, id: order.id })}
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
