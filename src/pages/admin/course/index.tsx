import React, { useState } from "react";
import TableData from "@/components/admin/TableData";
import { TableActionProps } from "@/components/admin/TableData";
import { NullProof, numberlistPagination } from "@/helpers/appFunction";
import { Typography } from "@material-tailwind/react";
import { courseServices } from "@/services/serviceGenerator";
import { Course } from "@/types/course.type";
import { Chip } from "@material-tailwind/react";
import { FilterInputList } from "./inputLayout";

const TABLE_HEAD = ["No", "Title", "Description", "Publised", "Action"];

export default function Index() {
  const [data, setData] = useState<any>({});
  const { Table, TableAction } = TableData({
    title: "Courses",
    description: "List of courses",
    tableHeader: TABLE_HEAD,
    service: courseServices,
    realtimeTable: "Course",
    onSuccess: (data: any) => setData(data),
    filter: FilterInputList,
  });

  return Table(
      NullProof({
        input: data,
        params: "data",
        isMap: true,
      }).map((course: Course, index: number) => {
        const isLast = index === data.data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        return (
          <tr key={course.id}>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {numberlistPagination({
                  n: index,
                  p: data?.page,
                  t: data?.size,
                })}
                .
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {NullProof({ input: course, params: "title" })}
              </Typography>
            </td>
            <td className={`${classes} max-w-[370px] max-h-min`}>
              <p className="line-clamp-2 text-sm">{NullProof({ input: course, params: "description" })}</p>
            </td>
            <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal flex"
            >
              <Chip
                variant="ghost"
                color={course.published ? "green" : "red"}
                size="sm"
                value={course.published ? "Published" : "Draft"}
                icon={
                  <span
                    className={`mx-auto mt-1 block h-2 w-2 rounded-full content-[''] ${
                      course.published ? "bg-green-900" : "bg-red-900"
                    }`}
                  />
                }
              />
            </Typography>
          </td>
            <td className={classes}>
              <TableAction data={dataAction} id={course.id} />
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
