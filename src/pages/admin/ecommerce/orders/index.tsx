import React, { useState } from "react";
import { Order } from "@/types/order.type";
import { TableActionProps, Table, TableAction, TableCol } from "@/components/admin/TableData";
import { orderServices } from "@/services/serviceGenerator";
import { ConvertCurrency, NullProof } from "@/helpers/appFunction";
import { tableHeaderProps } from "@/types/table.type";
import { Chip, Typography } from "@material-tailwind/react";
import { dateFormater } from "@/utils/date";

type DataProps = {
  data: Order[];
  page: number;
  size: number;
}

const TABLE_HEAD: tableHeaderProps[] = [
  { label: "Date", orderBy: "transactionTime" },
  { label: "Product" },
  { label: "Quantity", orderBy: "totalQuantityProduct", visible: true },
  { label: "Price", orderBy: "grossAmount", visible: true },
  { label: "User", visible: true },
  { label: "Status", visible: true },
  { label: "Actions" },
];

export default function Index() {
  const [data, setData] = useState<DataProps>({
    data: [],
    page: 0,
    size: 0,
  })
  
  return (
    <Table
      title="Orders"
      description="List of orders"
      tableHeader={TABLE_HEAD}
      service={orderServices}
      realtimeTable="Order"
      onSuccess={(data: DataProps) => setData(data)}
      isActionAdd={false}
    >
    {NullProof({
      input: data,
      params: "data",
      isMap: true,
    }).map((order: Order, index: number) => {
      const isLast = index === data.data.length - 1;
      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      const totalItems = order.products.reduce((acc, curr) => acc + curr.quantity, 0);
      return (
        <tr key={order.id}>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {dateFormater(String(order.transactionTime), "short")}
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {order.products.map((product) => product.name).join(", ")}
            </Typography>
          </td>
          <TableCol name='quantity' className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {totalItems > 1 ? `${totalItems} items` : `${totalItems} item`}
            </Typography>
          </TableCol>
          <TableCol name='price' className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {ConvertCurrency(order.grossAmount)}
            </Typography>
          </TableCol>
          <TableCol name='user' className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {`${order.customerDetails.first_name} ${order.customerDetails.last_name} (${order.customerDetails.email})`}
            </Typography>
          </TableCol>
          <TableCol name='status' className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal flex"
            >
              <Chip
                variant="ghost"
                color={order.transactionStatus === "settlement" || order.transactionStatus === "capture" ? "green" : "yellow"}
                size="sm"
                value={order.transactionStatus === "settlement" || order.transactionStatus === "capture" ? "Completed" : "Waiting Payment"}
                icon={
                  <span className={`mx-auto mt-1 block h-2 w-2 rounded-full content-[''] 
                    ${order.transactionStatus === "settlement" || order.transactionStatus === "capture" ? "bg-green-900" : "bg-yellow-900"}`}
                  />
                }
              />
            </Typography>
          </TableCol>
          <td className={classes}>
            <TableAction data={dataAction} id={order.id} />
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
  }
];