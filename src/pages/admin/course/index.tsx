import React, { useState, useEffect } from "react";
import TableData from "@/components/TableData";
import { TableActionProps } from "@/components/TableData";
import { NullProof, numberlistPagination } from "@/helpers/appFunction";
import { Typography } from "@material-tailwind/react";
import { courseServices } from "@/services/serviceGenerator";
import { Course } from "@/types/course.type";

const TABLE_HEAD = ["No", "Title", "Description", "Publised", "Action"];

export default function Index() {
  const [data, setData] = useState<any>({});
  const { Table, TableAction } = TableData({
    title: "Courses",
    description: "List of courses",
    tableHeader: TABLE_HEAD,
    service: courseServices,
    onSuccess: (data: any) => setData(data),
  });

  return Table(
    <React.Fragment>
      {NullProof({
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
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {NullProof({ input: course, params: "description" })}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {NullProof({
                  input: course,
                  params: "published",
                  type: "html",
                })}
              </Typography>
            </td>
            <td className={classes}>
              <TableAction data={dataAction} id={course.id} />
            </td>
          </tr>
        );
      })}
    </React.Fragment>
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
