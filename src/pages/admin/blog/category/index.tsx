import React, { useState, useEffect } from "react";
import TableData from "@/component/TableData";
import { DATA_CATEGORIES } from "@/helper/dummyData";
import { CategoryProps } from "@/helper/typeProps";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Name", "Action"];

export default function index() {
  const [data, setData] = useState([]);
  return (
    <TableData
      title="Categories"
      description="List of categories"
      tableHeader={TABLE_HEAD}
      dummyData={DATA_CATEGORIES}
      urlData="https://dummyjson.com/posts"
      onSuccess={(data) => setData(data)}
    >
      {/* {children} */}
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
              <Tooltip content="Edit Categori">
                <IconButton variant="text">
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
