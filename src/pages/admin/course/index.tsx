import React, { useState, useEffect } from "react";
import TableData from "@/components/TableData";
import { TableActionProps } from "@/components/TableData";
import { CategoryProps } from "@/helpers/typeProps";
import { NullProof } from "@/helpers/appFunction";
import {
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useRouter } from "next/router";

const TABLE_HEAD = ["Title", "Description", "Publised", "Action"];

export default function index() {
  const [data, setData] = useState([]);
  const router = useRouter();

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
  ];
  const {Table, TableAction} = TableData({
    title: "Courses",
    description: "List of courses",
    tableHeader: TABLE_HEAD,
    urlData: "/course",
    onSuccess: (data: any) => setData(data),
  })

  return (
    <Table>
      {data?.map((categori: CategoryProps, index: number) => {
        const isLast = index === data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        return (
          <tr key={categori.id}>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {NullProof({input:categori, params: "name"})}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {NullProof({input:categori, params: "description"})}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {NullProof({input:categori, params: "Published"})}
              </Typography>
            </td>
            <td className={classes}>
            <TableAction data={dataAction} id={categori.id} />
            </td>
          </tr>
        );
      })}
    </Table>
  );
}
