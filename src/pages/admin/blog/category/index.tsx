import React, { useState, FC } from "react";
import TableData from "@/components/TableData";
import { TableActionProps } from "@/components/TableData";
import { Typography } from "@material-tailwind/react";
import { GetCategory } from "@/types/category.type";
import { categoryServices } from "@/services/serviceGenerator";

const TABLE_HEAD = ["Name", "Total Post(s)", "Action"];

const Index: FC = () => {
  const [data, setData] = useState([]);
  const { Table, TableAction } = TableData({
    title: "Categories",
    description: "List of categories",
    tableHeader: TABLE_HEAD,
    urlData: "/category",
    service: categoryServices,
    onSuccess: (data) => setData(data),
  });

  return (
    <Table>
      {data?.map(({ id, name, posts }: GetCategory, index: number) => {
        const isLast = index === data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

        return (
          <tr key={id} className="even:bg-blue-gray-50/50">
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {name}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {posts.length === 0
                  ? "No post"
                  : posts.length === 1
                    ? "1 post"
                    : `${posts.length} posts`}
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

export default Index;