import React, { useState } from "react";
import TableData from "@/components/admin/TableData";
import { TableActionProps } from "@/components/admin/TableData";
import { Chip, Typography } from "@material-tailwind/react";
import { NullProof, numberlistPagination } from "@/helpers/appFunction";
import { FilterInputList } from "../../../constants/admin/InputLists/inputLayoutUser";
import { userServices } from "@/services/serviceGenerator";
import { GetUser } from "@/types/user.type";
import { dateFormater } from "@/utils/date";

type DataProps = {
  data: GetUser[];
  page: number;
  size: number;
}

const TABLE_HEAD = ["No", "Name", "Email", "Subscribe", "Subscribe Start", "Subscribe End"];

export default function Index() {
  const [data, setData] = useState<DataProps>({
    data: [],
    page: 0,
    size: 0,
  });

  const { Table } = TableData({
    title: "Users",
    description: "List of users",
    tableHeader: TABLE_HEAD,
    service: userServices,
    realtimeTable: "User",
    onSuccess: (data: DataProps) => setData(data),
    // filter: FilterInputList,
    isActionAdd: false,
  });

  return Table(
    NullProof({
      input: data,
      params: "data",
      isMap: true,
    }).map((user: GetUser, index: number) => {
      const isLast = index === data.data.length - 1;
      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      return (
        <tr key={user.id} className="even:bg-blue-gray-50/50">
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
                {NullProof({ input: user, params: "name" })}
              </Typography>
            </div>
          </td>
          <td className={`${classes} max-w-[370px] max-h-min`}>
            <Typography variant="small" color="blue-gray" className="font-bold">
              {NullProof({ input: user, params: "email" })}
            </Typography>
          </td>
          <td className={`${classes} max-w-[370px] max-h-min`}>
            <Typography variant="small" color="blue-gray" className="flex">
              <Chip
                variant="ghost"
                color={user.isSubscribed ? "green" : "red"}
                size="sm"
                value={user.isSubscribed ? "Subscribed" : "Not subscribed"}
                icon={
                  <span
                    className={`mx-auto mt-1 block h-2 w-2 rounded-full content-[''] ${user.isSubscribed ? "bg-green-900" : "bg-red-900"
                      }`}
                  />
                }
              />
            </Typography>
          </td>
          <td className={`${classes} max-w-[370px] max-h-min`}>
            <Typography variant="small" color="blue-gray">
              {user.subscribeStart ? dateFormater(user.subscribeStart, "short") : "-"}
            </Typography>
          </td>
          <td className={`${classes} max-w-[370px] max-h-min`}>
            <Typography variant="small" color="blue-gray">
              {user.subscribeEnd ? dateFormater(user.subscribeEnd, "short") : "-"}
            </Typography>
          </td>
          {/* <td className={classes}>
            <TableAction data={dataAction} id={user.id} />
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
