import React, { Fragment } from "react";
import { Typography, Button } from "@material-tailwind/react";

const TableSkeleton = ({
  long,
  isLoading,
  isError,
  onRefresh,
}: {
  long: number;
  isLoading: boolean;
  isError: boolean;
  onRefresh: () => void;
}) => {
  return (
    <Fragment>
      {[...Array(!isError ? 5 : 7)].map((_, i) => (
        <tr key={i}>
          {[...Array(long)].map((_, ii) => (
            <td
              key={ii}
              className={`${isLoading && "border-y border-blue-gray-100"} p-4`}
            >
              {isLoading && (
                <Typography
                  as='div'
                  variant="small"
                  className="font-normal h-3 w-28 leading-none bg-gray-200 rounded"
                >
                  &nbsp;
                </Typography>
              )}
              {!isLoading && i === 2 && (
                <div className="absolute w-full text-center right-0 left-0 flex flex-col">
                  <Typography>
                    {isError ? "Something when wrong" : "Data is empty"}
                  </Typography>
                  {isError && (
                    <Button
                      color="blue"
                      className="max-w-min self-center"
                      onClick={onRefresh}
                    >
                      Refresh
                    </Button>
                  )}
                </div>
              )}
            </td>
          ))}
        </tr>
      ))}
    </Fragment>
  );
};

export default TableSkeleton;