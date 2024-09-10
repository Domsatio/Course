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
import { courseServices } from "@/services/serviceGenerator";
import { Category } from "@/types/category.type";

const TABLE_HEAD = ["Title", "Description", "Publised", "Action"];

export default function Index() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const { Table, TableAction } = TableData({
    title: "Courses",
    description: "List of courses",
    tableHeader: TABLE_HEAD,
    urlData: "/course",
    service: courseServices,
    onSuccess: (data: any) => setData(data),
  })

  return (
    <Table>
      {data?.map((category: Category, index: number) => {
        const isLast = index === data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

        return (
          <tr key={category.id}>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {NullProof({ input: category, params: "title" })}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {NullProof({ input: category, params: "description" })}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {NullProof({ input: category, params: "published", type:"html" })}
              </Typography>
            </td>
            <td className={classes}>
              <TableAction data={dataAction} id={category.id} />
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