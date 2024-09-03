import React, { useState, useEffect } from "react";
import TableData from "@/components/TableData";
import { TableActionProps } from "@/components/TableData";  
import { CategoryProps } from "@/helpers/typeProps";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useRouter } from "next/router";

const TABLE_HEAD = ["Name", "Action"];

export default function index() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { Table, TableAction } = TableData({
    title: "Categories",
    description: "List of categories",
    tableHeader: TABLE_HEAD,
    urlData: "/category",
    onSuccess: (data) => setData(data),
  });

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
                {categori.name}
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