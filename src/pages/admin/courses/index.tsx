import React, { Fragment, useState } from "react";
import { Table, TableAction, TableCol, TableActionProps,} from "@/components/admin/TableData";
import { NullProof, numberlistPagination } from "@/helpers/appFunction";
import { Typography } from "@material-tailwind/react";
import { courseServices } from "@/services/serviceGenerator";
import { Course } from "@/types/course.type";
import { Chip } from "@material-tailwind/react";
import { FilterInputList } from "../../../constants/admin/InputLists/inputLayoutCourse";
import { tableHeaderProps } from "@/types/table.type";
import { Droppable } from "react-beautiful-dnd";

type DataProps = {
  data: Course[];
  page: number;
  size: number;
};

const TABLE_HEAD: tableHeaderProps[] = [
  { label: "No.", visible: true },
  { label: "Title", visible: true },
  { label: "Description", visible: true },
  { label: "Status", visible: true },
  { label: "Actions", visible: true },
];

export default function Index() {
  const [data, setData] = useState<DataProps>({
    data: [],
    page: 0,
    size: 0,
  });

  return (
  <Table 
    title="Courses"
    description="List of courses"
    tableHeader={TABLE_HEAD}
    service={courseServices}
    realtimeTable="Course"
    onSuccess={(data: DataProps) => setData(data)}
    filter={FilterInputList}
  >
      <Droppable droppableId="columns-body" direction="horizontal">
        {(provided) => (
          NullProof({
            input: data,
            params: "data",
            isMap: true,
          }).map((course: Course, index: number) => {
            const isLast = index === data.data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr
                key={index}
                className="even:bg-blue-gray-50/50"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <TableCol
                  name="No."
                  rowIndex={index}
                  index={0}
                  className={classes}
                >
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
                </TableCol>
                <TableCol
                  name="Title"
                  rowIndex={index}
                  index={1}
                  className={classes}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {NullProof({ input: course, params: "title" })}
                  </Typography>
                </TableCol>
                <TableCol
                  name="Description"
                  rowIndex={index}
                  index={2}
                  className={`${classes} max-w-[370px] max-h-min`}
                >
                  <p className="line-clamp-2 text-sm">
                    {NullProof({ input: course, params: "description" })}
                  </p>
                </TableCol>
                <TableCol
                  name="status"
                  rowIndex={index}
                  index={3}
                  className={classes}
                >
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
                </TableCol>
                <TableCol
                  name="Actions"
                  rowIndex={index}
                  index={4}
                  className={classes}
                >
                  <TableAction data={dataAction} id={course.id} />
                </TableCol>
                {provided.placeholder}
              </tr>
            )
          })
        )}
        </Droppable>
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
