import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "./Pagination";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Checkbox,
  Typography,
  Button,
  CardBody,
  Input,
  IconButton,
  Tooltip,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
} from "react-beautiful-dnd";
import TableSkeleton from "../Skeleton/table.skeleton";
import { TableDataProps } from "@/types/table.type";
import { FormInput } from "@/components/admin/FormInput";
import { supabase } from "@/libs/supabase";
import { getQueryParams } from "@/helpers/appFunction";
import { PaginationHook } from "@/hooks/paginationHook";
import { FetchDataHook } from "@/hooks/fetchDataHook";
import { SearchHook } from "@/hooks/searchHook";
import Link from "next/link";
import { ModalConfirmation } from "./ModalConfirmation";
import toast from "react-hot-toast";
import { cn } from "@/libs/cn";
import { tableHeaderProps } from "@/types/table.type";
import useTableStore from "@/store/tableSlice";

export interface TableActionProps {
  action: "update" | "delete" | "view" | "custom";
  onClick?: () => void;
  custom?: {
    label: string;
    icon: React.ReactElement;
  };
}

type SortByProps = {
  name: string;
  param: "asc" | "desc" | "neutral";
  time: Date;
};

type VisibleColumnsProps = {
  isVisible: boolean;
  label: string;
};

const keyVisibleColumns = (key: string) => {
  return key.toLowerCase().split(" ").join("") || key.toLowerCase();
};

export const Table = ({
    tableHeader = [],
    title = "",
    description = "",
    onSuccess,
    isActionAdd = true,
    filter,
    service,
    realtimeTable,
    exportExcel,
    children,
  }: TableDataProps) => { 
  const [header, setHeader] = useState<tableHeaderProps[]>(tableHeader);
  const [modalFilter, setModalFilter] = useState<boolean>(false);
  const { debounceValue, searchQuery, setSearchQuery } = SearchHook({});
  const { isLoad, isError, setIsLoad, setIsError, data, setData } =
    FetchDataHook();
  const [orderBy, setOrderBy] = useState<{ [key: string]: SortByProps }>({});
  const {
    activePage,
    setActivePage,
    totalPages,
    take,
    setTake,
    totalData,
    handleSetTotalPages,
  } = PaginationHook({});
  const router = useRouter();

  const { setListVisibleColumns, setSelectedId, selectedId } = useTableStore();

  const initialVisibleColumns = tableHeader.reduce(
    (acc: { [key: string]: any }, head: tableHeaderProps) => {
      if (head.visible) {
        const key = keyVisibleColumns(head.label);
        acc[key] = {
          isVisible: true,
          label: head.label,
        };
      }
      return acc;
    },
    {}
  );

  const [visibleColumns, setVisibleColumns] = useState<{
    [key: string]: VisibleColumnsProps;
  }>(initialVisibleColumns);

  useEffect(() => {
    setListVisibleColumns(visibleColumns);
  }, [visibleColumns]);

  const filterOrderBy = (): SortByProps | null => {
    const sort = Object.entries(orderBy).filter(
      ([key, value]) => value.param !== "neutral"
    );
    if (sort.length === 0) return null;
    if (sort.length === 1) return sort[0][1];
    return sort.reduce<[string, SortByProps]>((latest, current) => {
      return new Date(current[1].time) > new Date(latest[1].time)
        ? current
        : latest;
    }, sort[0])[1];
  };

  const handleSetLimit = (item: number) => {
    setTake(item);
    setActivePage(1);
  };

  const getDataTable = async () => {
    const orderByParam = filterOrderBy();
    const skip = activePage * take - take;
    const params: {
      skip: number;
      take: number;
      search?: string;
      orderBy?: string;
    } = {
      skip: skip,
      take,
      ...getQueryParams(),
    };
    if (searchQuery) {
      params.search = debounceValue || "";
    }
    if (orderByParam) {
      params.orderBy = `${orderByParam.name}:${orderByParam.param}`;
    }
    setIsLoad(true);
    setIsError(false);
    try {
      const {
        data: { totalData, data },
      } = await service.getItems(params);
      // setData(data);
      onSuccess?.({ data: data, page: activePage, size: take });
      handleSetTotalPages(totalData);
    } catch (error) {
      console.log("error", error);
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  const exportData = () => {
    toast
      .promise(
        new Promise<void>(async (resolve, reject) => {
          try {
            setIsLoad(true);
            const orderBy = filterOrderBy();
            let param: any = {
              skip: 0,
              take: "all",
              ...getQueryParams(),
            };
            if (orderBy) param.orderBy = `${orderBy.name}:${orderBy.param}`;
            const {
              data: { totalData, data },
            } = await service.getItems(param);
            resolve();
            exportExcel?.(data);
          } catch (error) {
            reject();
          }
        }),
        {
          loading: "Exporting...",
          success: "Export success",
          error: "Export failed",
        }
      )
      .finally(() => {
        setIsLoad(false);
      });
  };

  const handleDelete = async (id: string) => {
    try {
      const { data } = await service.deleteItem({ id });
      if (data) {
        getDataTable();
      }
      toast.success("Delete data success!");
    } catch (error) {
      toast.error("Delete data failed!");
      console.log("error", error);
    } finally {
      setSelectedId("");
    }
  };

  useEffect(() => {
    if (selectedId) {
      handleDelete(selectedId);
    }
  }, [selectedId]);

  useEffect(() => {
    const params: any = getQueryParams();
    setSearchQuery(params.search || "");
    // set realtime data on table
    if (realtimeTable) {
      const channels = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: realtimeTable },
          (payload) => {
            getDataTable();
          }
        )
        .subscribe();

      return () => {
        channels.unsubscribe();
      };
    }
  }, []);

  // a function to handle set query parameter and get data table
  const handleSetQuery = async () => {
    let query: any = { ...getQueryParams(), search: searchQuery || "" };
    if (query.search === "") {
      delete query.search;
    }
    const res = await router.replace({
      pathname: router.pathname,
      query: query,
    });
    if (!isLoad && res) {
      getDataTable();
    }
  };

  useEffect(() => {
    if (!isLoad) {
      getDataTable();
    }
  }, [take, activePage]);

  useEffect(() => {
    if (debounceValue !== null && !isLoad) {
      handleSetQuery();
    }
  }, [debounceValue]);

  useEffect(() => {
    if (Object.keys(orderBy).length > 0) {
      getDataTable();
    }
  }, [orderBy]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    console.log("result", result);
    const reorderedColumns = Array.from(header);
    const [movedColumn] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, movedColumn);
    console.log("reorderedColumns", reorderedColumns);
    setHeader(reorderedColumns);
  };

    return (
    <Card className="h-full w-full overflow-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              {title}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {description}
            </Typography>
          </div>
          <div className="flex w-full items-center shrink-0 gap-2 md:w-max">
            <div className="relative w-full flex md:w-72">
              <Input
                crossOrigin={"search"}
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery || ""}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              {searchQuery && (
                <IconButton
                  className="!absolute right-1 top-1 rounded"
                  color="red"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                  }}
                >
                  <XMarkIcon className="h-4 w-4" />
                </IconButton>
              )}
            </div>
            {isActionAdd && (
              <Link href={router.pathname + "/create"}>
                <Button color="blue">Create</Button>
              </Link>
            )}

            <Fragment>
              <Tooltip content="Filter">
                <Popover placement="bottom-end">
                  <PopoverHandler>
                    <IconButton variant="text">
                      <FunnelIcon className="h-5 w-5" />
                    </IconButton>
                  </PopoverHandler>
                  <PopoverContent
                    className={cn(
                      "min-w-max flex flex-col gap-3 z-30",
                      filter && "min-w-[300px]"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">Filter</h3>
                      {filter && (
                        <div>
                          <Button
                            size="sm"
                            color="blue"
                            onClick={() => setModalFilter(true)}
                          >
                            Filter lainnya
                          </Button>
                          <FormInput
                            inputList={filter}
                            method="GET"
                            service={service}
                            title="Filter"
                            asModal={{
                              isOpen: modalFilter,
                              handler: setModalFilter,
                            }}
                            onSubmit={() => getDataTable()}
                            onSuccess={(data) => onSuccess?.(data)}
                            isFilter={true}
                            toastMessage={{
                              success: "Filter success",
                              error: "Filter failed",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h5 className="font-semibold border-b-2">
                        Visible column
                      </h5>
                      <Checkbox
                        crossOrigin={"toggle all column"}
                        type="checkbox"
                        label="Toggle All"
                        checked={Object.values(visibleColumns).every(
                          (col) => col.isVisible
                        )} // Check if all columns are visible
                        onChange={() => {
                          const allVisible = Object.values(
                            visibleColumns
                          ).every((col) => col.isVisible);
                          setVisibleColumns((prev) => {
                            const updated = Object.keys(prev).reduce(
                              (
                                acc: { [key: string]: VisibleColumnsProps },
                                key
                              ) => {
                                acc[key] = {
                                  ...prev[key],
                                  isVisible: !allVisible,
                                };
                                return acc;
                              },
                              {}
                            );
                            return updated;
                          });
                        }}
                      />
                      {visibleColumns &&
                        Object.keys(visibleColumns).map((key) => (
                          <Checkbox
                            key={key}
                            crossOrigin={"visible column"}
                            label={visibleColumns[key].label}
                            checked={visibleColumns[key].isVisible}
                            onChange={() => {
                              setVisibleColumns(
                                (prev: { [x: string]: any }) => ({
                                  ...prev,
                                  [key]: {
                                    isVisible: !prev[key].isVisible,
                                    label: prev[key].label,
                                  },
                                })
                              );
                            }}
                          />
                        ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </Tooltip>
            </Fragment>
          </div>
        </div>
        <div className="flex justify-end">
          {exportExcel && (
            <Button
              color="green"
              onClick={() => exportData()}
              className="flex items-center gap-1 px-3"
              loading={isLoad}
            >
              <ArrowDownTrayIcon className="h-4 w-4 font-bold" /> Excel
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody className="overflow-auto px-0 max-h-[500px]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <table className="w-full min-w-max text-left">
            <thead className="sticky -top-[24.5px] h-8 z-20 bg-blue-gray-50">
              <Droppable droppableId="columns" direction="horizontal">
                {(provided) => (
                  <tr 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                  >
                    {header.map((head: tableHeaderProps, index: number) => {
                      const visibleKey = keyVisibleColumns(head.label);
                      if (head.visible && !visibleColumns[visibleKey].isVisible)
                        return null;
                      return (
                        <Draggable
                          key={head.label}
                          draggableId={head.label}
                          index={index}
                        >
                          {(providedd) => (
                            <th
                              key={index}
                              ref={providedd.innerRef}
                              {...providedd.draggableProps}
                              {...providedd.dragHandleProps}
                              className={cn(
                                "border-y border-blue-gray-100 p-4 bg-gray-50",
                                head.style && head.style
                              )}
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                {head.label}{" "}
                                {head.orderBy && (
                                  <IconButton
                                    className="bg-transparent shadow-none hover:shadow-none text-gray-500 px-0"
                                    color="blue-gray"
                                    size="sm"
                                    onClick={() => {
                                      const keyParam = head.orderBy as string;
                                      if (!orderBy[keyParam]) {
                                        setOrderBy((prev) => ({
                                          ...prev,
                                          [keyParam]: {
                                            name: keyParam,
                                            param: "asc",
                                            time: new Date(),
                                          },
                                        }));
                                      } else {
                                        setOrderBy((prev) => ({
                                          ...prev,
                                          [keyParam]: {
                                            name: keyParam,
                                            param:
                                              prev[keyParam]?.param ===
                                              "neutral"
                                                ? "asc"
                                                : prev[keyParam]?.param ===
                                                  "asc"
                                                ? "desc"
                                                : "neutral",
                                            time: new Date(),
                                          },
                                        }));
                                      }
                                    }}
                                  >
                                    {orderBy[head.orderBy as string]?.param ===
                                    "asc" ? (
                                      <ArrowUpIcon className="h-4 w-4" />
                                    ) : orderBy[head.orderBy as string]
                                        ?.param === "desc" ? (
                                      <ArrowDownIcon className="h-4 w-4" />
                                    ) : (
                                      <ArrowsUpDownIcon className="h-5 w-4" />
                                    )}
                                  </IconButton>
                                )}
                              </Typography>
                            </th>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </tr>
                  )}
              </Droppable>
            </thead>
            <tbody className="relative">
              {isLoad || isError || totalData === 0 ? (
                <TableSkeleton
                  long={tableHeader.length}
                  isLoading={isLoad}
                  isError={isError}
                  onRefresh={() => getDataTable()}
                />
              ) : 
                // <Droppable droppableId="columns-body" direction="horizontal">
                //   {(provided) => (
                //     <Fragment>
                //       {data.map((value:any, rowIndex:number) => (
                //         <tr key={rowIndex} className="even:bg-gray-50" {...provided.droppableProps} ref={provided.innerRef}>
                //           {header.map((column, index) => (
                //                 <td className="px-4 py-2">
                //                   {value[column.label.toLowerCase()] || "-"}
                //                 </td>
                //           ))}
                //         </tr>
                //       ))}
                //       {provided.placeholder}
                //     </Fragment>
                //   )}
                // </Droppable>
                children
              }
            </tbody>
          </table>
        </DragDropContext>
      </CardBody>
      <Pagination
        currentPage={activePage}
        totalData={totalData}
        totalPages={totalPages}
        limit={take}
        handleLimit={handleSetLimit}
        onPageChange={async (e: any) => {
          if (activePage !== e) {
            setActivePage(e);
          }
        }}
      />
    </Card>
  )
}

export const TableAction = ({
  data,
  id,
}: {
  data: TableActionProps[];
  id: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setSelectedId } = useTableStore();
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      setSelectedId("");
    }
  }, [isOpen]);

  return (
    <div className="flex gap-2 items-center">
      <ModalConfirmation
        isOpen={isOpen}
        handler={(value) => {
          setSelectedId("");
          setIsOpen(value);
        }}
        onConfirm={() => setSelectedId(id)}
      />

      {data.map(({ action, onClick, custom }) => (
        <Tooltip
          key={action}
          content={action[0].toUpperCase() + action.substring(1)}
        >
          {action === "view" || action === "update" ? (
            <Link href={router.pathname + `/${action}/` + id}>
              <IconButton variant="text" className="cursor-pointer" size="sm">
                {action === "update" ? (
                  <PencilSquareIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </IconButton>
            </Link>
          ) : (
            <IconButton
              variant="text"
              className="cursor-pointer"
              size="sm"
              onClick={action === "delete" ? () => setIsOpen(true) : onClick}
            >
              {action === "delete" ? (
                <TrashIcon className="h-4 w-4" color="red" />
              ) : (
                custom?.icon
              )}
            </IconButton>
          )}
        </Tooltip>
      ))}
    </div>
  );
};

export const TableCol = ({
  name,
  className,
  index,
  rowIndex,
  children,
}: {
  name: string;
  className: string;
  index?: number;
  rowIndex?: number;
  children: React.ReactNode;
}) => {
  const visibleColumns = useTableStore((state) => state.visibleColumns)
  
  return (
    <td
      className={cn(className, {
        hidden: !visibleColumns[keyVisibleColumns(name)]?.isVisible,
      })}
    >
      {children}
    </td>
  );
};