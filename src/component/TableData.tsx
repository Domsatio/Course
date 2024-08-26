import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { Pagination } from "./Pagination";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Input,
} from "@material-tailwind/react";
import { ProductProps, TableDataProps } from "@/helper/typeProps";

const filterDataDummy = (data: [], page: number, size: number) => {
  const offset = Math.ceil(page - 1) * size || 0;
  const filterDataWithPagination = data.slice(offset, offset + size) || [];
  return filterDataWithPagination;
};

export default function TableData({
  dummyData,
  tableHeader = [],
  urlData = "",
  title = "",
  description = "",
  onSuccess,
  children,
  isActionAdd = true,
  filter
}: TableDataProps) {
  const [data, setData] = React.useState<ProductProps[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activePage, setActivePage] = React.useState(1);
  const [limit, setlimit] = React.useState<number>(5);
  const [totalPages, setTotalPages] = React.useState(0);
  const [debounceValue] = useDebounce(searchQuery, 1500);
  const router = useRouter();
  // const { search } = router.query;

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
  }, [limit, data, activePage]);

  useEffect(() => {
    router.push(
      {
        pathname: router.pathname,
        query: { search: debounceValue.toLowerCase() },
      },
      undefined,
      { shallow: true }
    );
    // getDataTable();
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
    const param: { limit: number; page: number; search?: string, filter?: any } = {
      limit: limit,
      page: activePage,
    };
    if (searchQuery) {
      param.search = debounceValue;
    }
    try {
      const response = await axios.get(urlData, {
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
        params: param
      });
      console.log(response.data);
      if (onSuccess) {
        onSuccess(response.data.posts);
      }
      setTotalPages(response.data.totalPages);
      setData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

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
            <div className="w-full flex md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
            {searchQuery && (
              <Button
                className="flex bg-red-600 items-center gap-3"
                size="sm"
                onClick={() => setSearchQuery("")}
              >
                clear
              </Button>
            )}
            {isActionAdd && (
              <Button className="flex items-center gap-3" size="sm" onClick={() => router.push(router.pathname+"/tambah")}>
                Add
              </Button>
            )}
            {filter && (
              // <Button className="flex items-center gap-3" size="sm">
                <FunnelIcon className="h-6 w-6" cursor='pointer' onClick={() => console.log('opop')} />
              //   Filter
              // </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHeader.map((head: any) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
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
          <tbody>{children}</tbody>
        </table>
      </CardBody>
      <Pagination
        currentPage={activePage}
        maxButtons={5}
        totalPages={totalPages}
        limit={limit}
        handleLimit={handleSetLImit}
        onPageChange={(e) => {
          if (activePage !== e) setActivePage(e);
        }}
      />
    </Card>
  );
}

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export function DialogDefault() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Modal
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple modal.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Applay</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}