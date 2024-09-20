import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "./Pagination";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Input,
  IconButton,
  Tooltip,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import TableSkeleton from "../Skeleton/TableSkeleton";
import { TableDataProps } from "@/types/table.type";
import FormInput from "@/components/admin/FormInput";
import { supabase } from "@/libs/supabase";
import { getQueryParams } from "@/helpers/appFunction";
import { PaginationHook } from "@/hooks/paginationHook";
import { FetchDataHook } from "@/hooks/fetchDataHook";
import { SearchHook } from "@/hooks/searchHook";

export interface TableActionProps {
  action: "update" | "delete" | "view" | "custom";
  onClick?: () => void;
  custom?: {
    label: string;
    icon: any;
  };
}

export default function TableData({
  tableHeader = [],
  title = "",
  description = "",
  onSuccess,
  isActionAdd = true,
  filter,
  service,
  realtimeTable,
}: TableDataProps) {
  const [modalFilter, setModalFilter] = useState<boolean>(false);
  const { debounceValue, searchQuery, setSearchQuery } = SearchHook({});
  const { isLoad, isError, setIsLoad, setIsError } = FetchDataHook();
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

  const handleSetLimit = (item: number) => {
    setTake(item);
    setActivePage(1);
  };

  const getDataTable = async () => {
    const skip = activePage * take - take;
    const params: {
      skip: number;
      take: number;
      search?: string;
    } = {
      skip: skip,
      take,
      ...getQueryParams(),
    };
    if (searchQuery) {
      params.search = debounceValue || "";
    }
    setIsLoad(true);
    setIsError(false);
    try {
      const {
        data: { totalData, data },
      } = await service.getItems(params);
      onSuccess?.({ data: data, page: activePage, size: take });
      handleSetTotalPages(totalData);
    } catch (error) {
      console.log("error", error);
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { data } = await service.deleteItem({ id: id });
      if (data) {
        getDataTable();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const params: any = getQueryParams();
    setSearchQuery(params.search || "");
    if (!params.search || params.search === "") {
      getDataTable();
    }
    // set realtime data on table
    if (realtimeTable) {
      const channels = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: realtimeTable },
          (payload) => {
            console.log("Change received!", payload);
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
    const res = await router.push(
      {
        pathname: router.pathname,
        query: { search: searchQuery?.toLowerCase() || "" },
      },
      undefined,
      { shallow: true }
    );
    if (!isLoad && res) {
      getDataTable();
    }
  };

  useEffect(() => {
    handleSetQuery();
  }, [debounceValue, take, activePage]);

  // table component
  const Table = (children: React.ReactNode) => (
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
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery || ""}
                onChange={(e) => {
                  e.preventDefault();
                  setSearchQuery(e.target.value);
                }}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              {searchQuery && (
                <Button
                  className="flex bg-red-600 items-center gap-3 !absolute right-1 top-1 rounded"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                  }}
                >
                  <XMarkIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
            {isActionAdd && (
              <Button
                color="blue"
                onClick={() => router.push(router.pathname + "/create")}
              >
                Create
              </Button>
            )}
            {filter && (
              <React.Fragment>
                <FunnelIcon
                  className="h-6 w-6"
                  cursor="pointer"
                  onClick={() => setModalFilter(true)}
                />
                <FormInput
                  inputList={filter}
                  method="GET"
                  service={service}
                  title="Filter"
                  asModal={{
                    isOpen: modalFilter,
                    handler: setModalFilter,
                  }}
                  onSubmit={(data) => getDataTable()}
                  onSuccess={(data) => onSuccess?.(data)}
                  isFilter={true}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 max-h-[500px]">
        <table className="w-full min-w-max text-left">
          <thead className="sticky -top-[24.5px] h-8 z-30 bg-blue-gray-50">
            <tr>
              {tableHeader.map((head: any) => (
                <th key={head} className="border-y border-blue-gray-100  p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="relative">
            {isLoad || isError || totalData === 0 ? (
              <TableSkeleton
                long={tableHeader.length}
                isLoading={isLoad}
                isError={isError}
                onRefresh={getDataTable}
              />
            ) : (
              children
            )}
          </tbody>
        </table>
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
  );

  // table action component
  const TableAction = ({
    data,
    id,
  }: {
    data: TableActionProps[];
    id: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex gap-2 items-center">
        <Dialog size="xs" open={isOpen} handler={() => setIsOpen(true)}>
          <DialogHeader color="red">Delete Data</DialogHeader>
          <DialogBody>Are you sure you want to delete this data?</DialogBody>
          <DialogFooter>
            <Button
              variant="outlined"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              color="red"
              className="ml-2"
              onClick={() => handleDelete(id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </Dialog>
        {data.map(({ action, onClick, custom }) => (
          <Tooltip
            key={action}
            content={action[0].toUpperCase() + action.substring(1)}
          >
            <IconButton
              variant="text"
              className="cursor-pointer"
              size="sm"
              onClick={
                action === "custom"
                  ? onClick
                  : action === "delete"
                    ? () => setIsOpen(true)
                    : () => router.push(router.pathname + `/${action}/` + id)
              }
            >
              {action === "custom" ? (
                custom?.icon
              ) : action === "update" ? (
                <PencilSquareIcon className="h-4 w-4" />
              ) : action === "delete" ? (
                <TrashIcon className="h-4 w-4" color="red" />
              ) : action === "view" ? (
                <EyeIcon className="h-4 w-4" />
              ) : null}
            </IconButton>
          </Tooltip>
        ))}
      </div>
    );
  };

  return {
    Table,
    TableAction,
  };
}


