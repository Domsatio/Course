import React, { useState } from "react";
import TableData from "@/components/TableData";
import { TableActionProps } from "@/components/TableData";
import {
  Typography,
  Chip,
} from "@material-tailwind/react";
import { postServices } from "@/services/serviceGenerator";
import { CategoryPost, GetPost } from "@/types/post.type";
import { dateFormater } from "@/helpers/date";

const TABLE_HEAD = ["Title", "Body", "Category(es)", "Published", "Date Created", "Action"];

export default function Index() {
  const [data, setData] = useState<GetPost[]>([]);
  const { Table, TableAction } = TableData({
    title: "Posts",
    description: "List of posts",
    tableHeader: TABLE_HEAD,
    service: postServices,
    onSuccess: (data: GetPost[]) => setData(data),
  });

  return (
    <Table>
      {data?.map(({ id, title, body, categories, published, createdAt }: GetPost, index: number) => {
        const isLast = index === data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        return (
          <tr key={id}>
            <td className={classes}>
              <div className="flex items-center gap-3">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  {title}
                </Typography>
              </div>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {body}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                <div className="flex gap-1">
                  {categories.map(({ category: { id, name } }: CategoryPost) => (
                    <Chip
                      key={id}
                      value={name}
                      size="sm"
                      variant="outlined"
                    />
                  ))}
                </div>
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
                  color={published ? "green" : "red"}
                  size="sm"
                  value={published ? "Published" : "Draft"}
                  icon={
                    <span className={`mx-auto mt-1 block h-2 w-2 rounded-full content-[''] ${published ? 'bg-green-900' : 'bg-red-900'}`} />
                  }
                />
              </Typography>
            </td>
            <td className={classes}>
              <div className="flex items-center gap-3">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {dateFormater(createdAt)}
                </Typography>
              </div>
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
  }
];
