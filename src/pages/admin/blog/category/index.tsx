import React, { useState, FC } from "react";
import TableData from "@/components/TableData";
import { TableActionProps } from "@/components/TableData";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { GetCategory } from "@/types/category.type";

const TABLE_HEAD = ["Name", "Total Post", "Action"];

const Index: FC = () => {
  const [data, setData] = useState([]);
  const { push } = useRouter();
  const { Table, TableAction } = TableData({
    title: "Categories",
    description: "List of categories",
    tableHeader: TABLE_HEAD,
    urlData: "/category",
    onSuccess: (data) => setData(data),
  });

  return (
    <Table>
      {data?.map((category: GetCategory, index: number) => {
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
                {category.name}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {category.posts.length}
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

export default Index;