import React, { useState } from "react";
import TableData from "@/components/TableData";
import { TableActionProps } from "@/components/TableData";
import { Typography, Chip } from "@material-tailwind/react";
import { postServices } from "@/services/serviceGenerator";
import { CategoryPost, GetPost } from "@/types/post.type";
import { dateFormater } from "@/helpers/date";
import { NullProof, numberlistPagination } from "@/helpers/appFunction";
import { FilterInputList } from "./inputLayout";

const TABLE_HEAD = [
  "No",
  "Title",
  "Body",
  "Category(es)",
  "Published",
  "Date Created",
  "Action",
];

export default function Index() {
  const [data, setData] = useState<any>({});
  const { Table, TableAction } = TableData({
    title: "Posts",
    description: "List of posts",
    tableHeader: TABLE_HEAD,
    service: postServices,
    realtimeTable: "Post",
    onSuccess: (data: GetPost[]) => setData(data),
    filter: FilterInputList,
  });

  return Table(
    NullProof({
      input: data,
      params: "data",
      isMap: true,
    }).map((post: GetPost, index: number) => {
      const isLast = index === data.data.length - 1;
      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      return (
        <tr key={post.id}>
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
                {NullProof({ input: post, params: "title" })}
              </Typography>
            </div>
          </td>
          <td className={`${classes} max-w-[370px] max-h-min`}>
            <p
              // variant="small"
              color="blue-gray"
              className="font-normal line-clamp-2 text-sm"
            >
              {NullProof({ input: post, params: "body" })}
            </p>
          </td>
          <td className={`${classes} max-w-[370px] max-h-min`}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              <div className="flex flex-wrap gap-1">
                {NullProof({
                  input: post,
                  params: "categories",
                  isMap: true,
                }).map(({ category: { id, name } }: CategoryPost) => (
                  <Chip key={id} value={name} size="sm" variant="outlined" />
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
                color={post.published ? "green" : "red"}
                size="sm"
                value={post.published ? "Published" : "Draft"}
                icon={
                  <span
                    className={`mx-auto mt-1 block h-2 w-2 rounded-full content-[''] ${post.published ? "bg-green-900" : "bg-red-900"
                      }`}
                  />
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
                {dateFormater(post.createdAt, "short")}
              </Typography>
            </div>
          </td>
          <td className={classes}>
            <TableAction data={dataAction} id={post.id} />
          </td>
        </tr>
      );
    })
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
