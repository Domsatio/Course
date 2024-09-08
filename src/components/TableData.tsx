"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import { Pagination } from "./Pagination";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { ProductProps, TableDataProps } from "@/helpers/typeProps";
import FormInput from "@/components/FormInput";

export interface TableActionProps {
  action: "update" | "delete" | "view" | "custom";
  onClick?: () => void;
  custom?: {
    label: string;
    icon: any;
  };
}

const filterDataDummy = (data: any[], page: number, size: number) => {
  const offset = Math.ceil(page - 1) * size || 0;
  const filterDataWithPagination = data.slice(offset, offset + size) || [];
  return filterDataWithPagination;
};

const TableHook = ({
  onSuccess,
  service
}: {
  onSuccess?: (e: any) => void;
  service: any
}) => {
  const [data, setData] = useState<ProductProps[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [limit, setlimit] = useState<number>(5);
  const [totalPages, setTotalPages] = useState(0);
  const [debounceValue] = useDebounce(searchQuery, 1500);
  const [modalFilter, setModalFilter] = useState(false);
  const [dummyData, setDummyData] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlParams.entries());
      setSearchQuery(params.search || "");
    }
    // setSearchQuery(search as string || '');
    if (dummyData) {
      const data = filterDataDummy(dummyData, activePage, limit);
      if (onSuccess) {
        onSuccess(data);
      }
      setTotalPages(Math.ceil(dummyData.length / limit));
    } else {
      getDataTable();
    }
  }, [limit, activePage]);

  useEffect(() => {
    router.push(
      {
        pathname: router.pathname,
        query: { search: debounceValue.toLowerCase() },
      },
      undefined,
      { shallow: true }
    );
    getDataTable();
    // if (search) {
    //   const filterData = data.filter((item) => {
    //     return item.name.toLowerCase().includes(search.toLowerCase());
    //   });
    //   setData(filterData);
    // }
  }, [debounceValue]);

  const handleSetLImit = (item: number) => {
    setlimit(item);
    setActivePage(1);
  };

  const getDataTable = async () => {
    const params: {
      limit: number;
      page: number;
      search?: string;
      filter?: any;
    } = {
      limit: limit,
      page: activePage,
    };
    if (searchQuery) {
      params.search = debounceValue;
    }
    try {
      setIsLoad(true);
      const { data: { data, totalPages } } = await service.getItems(params);
      if (onSuccess) {
        onSuccess(data);
      }
      setTotalPages(totalPages);
      setData(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoad(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // const response = await axios.delete("/api" + urlData, {
      //   params: { id: id },
      // });
      const { data } = await service.deleteItem({ id: id });
      if (data) {
        getDataTable();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    router,
    data,
    setData,
    isLoad,
    setIsLoad,
    searchQuery,
    setSearchQuery,
    activePage,
    setActivePage,
    limit,
    setlimit,
    totalPages,
    setTotalPages,
    debounceValue,
    modalFilter,
    setModalFilter,
    handleSetLImit,
    getDataTable,
    handleDelete,
    dummyData,
    setDummyData,
  };
};

export default function TableData({
  tableHeader = [],
  urlData = "",
  title = "",
  description = "",
  onSuccess,
  isActionAdd = true,
  filter,
  service
}: TableDataProps) {
  const {
    router,
    data,
    setData,
    isLoad,
    setIsLoad,
    searchQuery,
    setSearchQuery,
    activePage,
    setActivePage,
    limit,
    setlimit,
    totalPages,
    setTotalPages,
    debounceValue,
    modalFilter,
    setModalFilter,
    handleSetLImit,
    getDataTable,
    handleDelete,
    setDummyData,
  } = TableHook({ onSuccess: onSuccess, service: service });

  const Table = ({ children }: { children: React.ReactNode }) => {
    return (
      <Card className="h-full w-full">
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                {searchQuery && (
                  <Button
                    className="flex bg-red-600 items-center gap-3 !absolute right-1 top-1 rounded"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                  >
                    clear
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
                    route={{
                      method: "POST",
                      url: urlData,
                      query: router.query,
                    }}
                    service={service}
                    title="Filter"
                    asModal={{ isOpen: modalFilter, handler: setModalFilter }}
                    onSuccess={(data) => setData(data)}
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
            <tbody className="">
              {isLoad ? <TableSkeleton long={tableHeader.length} /> : children}
            </tbody>
          </table>
        </CardBody>
        <Pagination
          currentPage={activePage}
          maxButtons={5}
          totalPages={totalPages}
          limit={limit}
          handleLimit={handleSetLImit}
          onPageChange={(e: any) => {
            if (activePage !== e) setActivePage(e);
          }}
        />
      </Card>
    );
  };

  const TableAction = ({
    data,
    id,
  }: {
    data: TableActionProps[];
    id: string;
  }) => {
    return (
      <div className="flex gap-2 items-center">
        {data.map(({ action, onClick, custom }) => (
          <Tooltip key={action} content={action[0].toUpperCase() + action.substring(1)}>
            <IconButton
              variant="text"
              className="cursor-pointer"
              size="sm"
              onClick={
                action === "custom"
                  ? onClick
                  : action === "delete"
                    ? () => handleDelete(id)
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

const TableSkeleton = ({ long }: { long: number }) => {
  return (
    <React.Fragment>
      {[...Array(5)].map((_, index) => (
        <tr key={index}>
          {[...Array(long)].map((_, index) => (
            <td key={index} className="border-y border-blue-gray-100 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                <Typography as="div" className="h-5 rounded-full bg-gray-300">
                  {" "}
                  &nbsp;
                </Typography>
              </Typography>
            </td>
          ))}
        </tr>
      ))}
    </React.Fragment>
  );
};
