import React, { useState } from "react";
import TableData from "@/components/admin/TableData";
import { TableActionProps } from "@/components/admin/TableData";
import { Typography } from "@material-tailwind/react";
import { NullProof, numberlistPagination } from "@/helpers/appFunction";
import { FilterInputList } from "./inputLayout";
import { userServices } from "@/services/serviceGenerator";
import { User } from "@/types/user.type";

const TABLE_HEAD = ["No", "Name", "Email"];

export default function Index() {
  const [data, setData] = useState<any>({});
  const { Table, TableAction } = TableData({
    title: "Users",
    description: "List of users",
    tableHeader: TABLE_HEAD,
    service: userServices,
    realtimeTable: "User",
    onSuccess: (data: User[]) => setData(data),
    // filter: FilterInputList,
    isActionAdd: false,
  });

  return Table(
    NullProof({
      input: data,
      params: "data",
      isMap: true,
    }).map((post: User, index: number) => {
      const isLast = index === data.data.length - 1;
      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      return (
        <tr key={post.id}>
          <td className={classes}>
            <div className="flex items-center gap-3">
              <Typography variant="small" color="blue-gray">
                {numberlistPagination({
                  n: index,
                  p: data?.page,
                  t: data?.size,
                })}
                .
              </Typography>
            </div>
          </td>
          <td className={classes}>
            <div className="flex items-center gap-3">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                {NullProof({ input: post, params: "name" })}
              </Typography>
            </div>
          </td>
          <td className={`${classes} max-w-[370px] max-h-min`}>
            <Typography variant="small" color="blue-gray" className="font-bold">
              {NullProof({ input: post, params: "email" })}
            </Typography>
          </td>
          {/* <td className={classes}>
            <TableAction data={dataAction} id={post.id} />
          </td> */}
        </tr>
      );
    })
  );
}

const dataAction: TableActionProps[] = [
  {
    action: "view",
  },
];
