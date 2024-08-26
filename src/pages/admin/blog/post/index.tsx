import React, { useState, useEffect } from "react";
import TableData from "@/component/TableData";
import { DATA_POSTS } from "@/helper/dummyData";
import { PostProps, CategoryProps } from "@/helper/typeProps";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  rating,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Title", "Body", "Category", ""];

export default function index() {
  const [data, setData] = useState([]);
  return (
    <TableData
      title="Posts"
      description="List of posts"
      tableHeader={TABLE_HEAD}
      dummyData={DATA_POSTS}
      urlData="https://dummyjson.com/posts"
      onSuccess={(data) => setData(data)}
      filter={{
        search: true,
        filter: true,
        limit: true,
      }}
    >
      {/* {children} */}
      {data?.map((post: PostProps, index: number) => {
        const isLast = index === data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        return (
          <tr key={post.id}>
            <td className={classes}>
              <div className="flex items-center gap-3">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  {post.title}
                </Typography>
              </div>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {post.body}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                <div className="flex gap-2">
                  {post.categories?.map(
                    (category: CategoryProps, index: number) => (
                      <Chip
                        key={index}
                        value={category.name}
                        className="min-w-min"
                      />
                    )
                  )}
                </div>
              </Typography>
            </td>
          </tr>
        );
      })}
    </TableData>
  );
}
