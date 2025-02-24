import React, { useState } from "react";
import { TableActionProps, Table, TableAction, TableCol } from "@/components/admin/TableData";
import { Typography, Chip } from "@material-tailwind/react";
import { postServices } from "@/services/serviceGenerator";
import { CategoryPost, GetPost } from "@/types/post.type";
import { dateFormater } from "@/utils/date";
import { NullProof, numberlistPagination } from "@/helpers/appFunction";
import { FilterInputList } from "../../../../constants/admin/InputLists/inputLayoutPost";
import { tableHeaderProps } from "@/types/table.type";
import { cn } from "@/libs/cn";

type DataProps= {
  data: GetPost[];
  page: number;
  size: number;
}

const TABLE_HEAD: tableHeaderProps[] = [
  { label: "No.", style: "md:sticky md:left-0 md:z-10" },
  { label: "Title", style: "md:sticky md:left-[54px] md:z-10" },
  { label: "Body", visible: true },
  { label: "Categories", visible: true },
  { label: "Status", visible: true },
  { label: "Created At", orderBy: "createdAt", visible: true },
  { label: "Actions" },
];

export default function Index() {
  const [data, setData] = useState<DataProps>({
    data: [],
    page: 0,
    size: 0,
  });

  return (
    <Table
      title="Posts"
      description="List of posts"
      tableHeader={TABLE_HEAD}
      service={postServices}
      realtimeTable="Post"
      onSuccess={(data: DataProps) => setData(data)}
      filter={FilterInputList}
    >
    {NullProof({
      input: data,
      params: "data",
      isMap: true,
    }).map((post: GetPost, index: number) => {
      const isLast = index === data.data.length - 1;
      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      return (
        <tr key={post.id} className="even:bg-blue-gray-50/50">
          <td className={cn(`${classes} md:sticky md:left-0 md:z-10`, 
            index % 2 === 0 ? 'bg-white' : 'bg-gray-100')}>
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
          <td className={cn(`${classes} max-w-[250px] max-h-min md:sticky md:left-[54px] md:z-10`,
             index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
          )}>
            <div className="flex items-center gap-3">
              <p
                color="blue-gray"
                className="prose font-normal line-clamp-2"
              >
                {NullProof({ input: post, params: "title" })}
              </p>
            </div>
          </td>
          <TableCol name='body' className={`${classes} max-w-[370px] max-h-min`}>
            <article
              color="blue-gray"
              className="prose font-normal line-clamp-2 text-sm"
              dangerouslySetInnerHTML={{
                __html: NullProof({ input: post, params: "body" }),
              }}
            ></article>
          </TableCol>
          <TableCol name='categories' className={`${classes} max-w-[370px] max-h-min`}>
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
          </TableCol>
          <TableCol name='status' className={classes}>
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
          </TableCol>
          <TableCol name='createdAt' className={classes}>
            <div className="flex items-center gap-3">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {dateFormater(post.createdAt, "short")}
              </Typography>
            </div>
          </TableCol>
          <td className={classes}>
            <TableAction data={dataAction} id={post.id} />
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
