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
} from "@material-tailwind/react";
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

export interface TableActionProps {
  action: "update" | "delete" | "view" | "custom";
  onClick?: () => void;
  custom?: {
    label: string;
    icon: React.ReactElement;
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
  exportExcel,
}: TableDataProps) {

  const [modalFilter, setModalFilter] = useState<boolean>(false);
  const { debounceValue, searchQuery, setSearchQuery } = SearchHook({});
  const { isLoad, isError, setIsLoad, setIsError, data, setData } = FetchDataHook();
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

  const exportData = () => {
    toast.promise(
      new Promise<void>(async (resolve, reject) => {
      try {
        setIsLoad(true);
        const {
          data: { totalData, data },
        } = await service.getItems({
          skip:0, 
          take: "all",
          ...getQueryParams()
        });
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
    })
    .finally(() => {
      setIsLoad(false);
    });
  }

  const handleDelete = async (id: string) => {
    try {
      const { data } = await service.deleteItem({ id });
      if (data) {
        getDataTable();
      }
      toast.success('Delete data success!')
    } catch (error) {
      toast.error('Delete data failed!')
      console.log("error", error);
    }
  };

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
    if (query.search === '') {
      delete query.search;
    }
    const res = await router.replace(
      {
        pathname: router.pathname,
        query: query,
      });
    if (!isLoad && res) {
      getDataTable();
    }
  };

  useEffect(() => {
    if (!isLoad) {
      getDataTable()
    }
  }, [take, activePage])

  useEffect(() => {
    if (debounceValue !== null && !isLoad) {
      handleSetQuery();
    }
  }, [debounceValue]);

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
                <Button color="blue">
                  Create
                </Button>
              </Link>
            )}
            {filter && (
              <Fragment>
                <Tooltip content="Filter">
                  <IconButton variant="text" onClick={() => setModalFilter(true)}>
                    <FunnelIcon className="h-5 w-5" />
                  </IconButton>
                </Tooltip>
                <FormInput
                  inputList={filter}
                  method="GET"
                  service={service}
                  title="Filter"
                  asModal={{
                    isOpen: modalFilter,
                    handler: setModalFilter,
                  }}
                  onSubmit={getDataTable}
                  onSuccess={(data) => onSuccess?.(data)}
                  isFilter={true}
                  toastMessage={{
                    success: "Filter success",
                    error: "Filter failed"
                  }}
                />
              </Fragment>
            )}
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
        <table className="w-full min-w-max text-left">
          <thead className="sticky -top-[24.5px] h-8 z-30 bg-blue-gray-50">
            <tr>
              {tableHeader.map((head: string) => (
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
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <div className="flex gap-2 items-center">
        <ModalConfirmation
          isOpen={isOpen}
          handler={setIsOpen}
          onConfirm={() => handleDelete(id)}
        />

        {data.map(({ action, onClick, custom }) => (
          <Tooltip
            key={action}
            content={action[0].toUpperCase() + action.substring(1)}
          >
            {(action === 'view' || action === 'update') ? (
              <Link href={router.pathname + `/${action}/` + id}>
                <IconButton
                  variant="text"
                  className="cursor-pointer"
                  size="sm"
                >
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
                onClick={
                  action === "delete"
                    ? () => setIsOpen(true)
                    : onClick
                }
              >
                {action === "delete" ? (
                  <TrashIcon className="h-4 w-4" color="red" />
                ) : custom?.icon}
              </IconButton>
            )}
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


