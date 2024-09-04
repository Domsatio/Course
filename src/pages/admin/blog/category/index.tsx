import React, { useState, useEffect, FC } from "react";
import TableData from "@/components/TableData";
import { GetCategory } from "@/types/category.type";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useRouter } from "next/router";

const TABLE_HEAD = ["Name", "Total Post", "Action"];

const Index: FC = () => {
  const [data, setData] = useState([]);
  const { push, pathname } = useRouter();

  return (
    <TableData
      title="Categories"
      description="List of categories"
      tableHeader={TABLE_HEAD}
      urlData="/category"
      onSuccess={(data: any) => setData(data)}
    >
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
              <Tooltip content="Edit Category">
                <IconButton variant="text" onClick={() => push(pathname + "/update/" + category.id)}>
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
        );
      })}
    </TableData>
  );
}

export default Index
