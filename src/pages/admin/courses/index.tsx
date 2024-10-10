import React, { useState } from "react";
import TableData from "@/components/admin/TableData";
import { TableActionProps } from "@/components/admin/TableData";
import { NullProof, numberlistPagination } from "@/helpers/appFunction";
import { Typography } from "@material-tailwind/react";
import { courseServices } from "@/services/serviceGenerator";
import { Course } from "@/types/course.type";
import { Chip } from "@material-tailwind/react";
import { FilterInputList } from "../../../constants/admin/InputLists/inputLayoutCourse";
import { tableHeaderProps } from "@/types/table.type";

type DataProps = {
  data: Course[];
  page: number;
  size: number;
}

const TABLE_HEAD: tableHeaderProps[] = [
  { label: "No." },
  { label: "Title" },
  { label: "Description" },
  { label: "Status" },
  { label: "Actions" },
];

export default function Index() {
  const [data, setData] = useState<DataProps>({
    data: [],
    page: 0,
    size: 0,
  });
  const { Table, TableAction } = TableData({
    title: "Courses",
    description: "List of courses",
    tableHeader: TABLE_HEAD,
    service: courseServices,
    realtimeTable: "Course",
    onSuccess: (data: DataProps) => setData(data),
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
        <tr key={course.id} className="even:bg-blue-gray-50/50">
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
                    className={`mx-auto mt-1 block h-2 w-2 rounded-full content-[''] ${course.published ? "bg-green-900" : "bg-red-900"
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
