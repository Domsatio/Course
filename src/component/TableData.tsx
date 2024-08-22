import React, { Children, useEffect } from "react";
import axios from "axios";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Pagination } from "./Pagination";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  rating,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ProductProps, TableDataProps } from "@/helper/typeProps";
import { DATA_PRODUCTS } from "@/helper/dummyData";
import { log } from "console";

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];



const filterDataDummy = (data: [], page: number, size: number) => {
  const offset = Math.ceil(page - 1) * size || 0;
  const filterDataWithPagination = data.slice(offset, offset + size) || [];
  return filterDataWithPagination
}

export default function TableData({
  dummyData,
  tableProperties = [],
  tableHeader = [],
  urlData = '',
  title = '',
  description = '',
  onSuccess,
  children,
}: TableDataProps) {
  const [data, setData] = React.useState<ProductProps[]>([]);
  const [activePage, setActivePage] = React.useState(1);
  const [limit, setlimit] = React.useState<number>(5);
  const [totalPages, setTotalPages] = React.useState(0);

  
  useEffect(() => {
    if(dummyData){
      const data = filterDataDummy(dummyData, activePage, limit);
      if(onSuccess){
        onSuccess(data);
      }
      setTotalPages(Math.ceil(dummyData.length / limit));
    }else{
      getDataTable();
    }
  }, [limit, data, activePage]);

  const handleSetLImit = (item: number) => {
    setlimit(item);
    setActivePage(1);
  };

  const getDataTable = async () => {
    try {
      const response = await axios.get(urlData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        params: {
          limit: limit,
          skip: activePage,
        },
      });
      console.log(response);
      if (onSuccess) {
        onSuccess(response.data);
      }
      setTotalPages(response.data.totalPages);
      setData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  }
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
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              Add
            </Button>
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
          <tbody>
            {children}
          </tbody>
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


// {data?.map(
//   (
//     {
//       image,
//       name,
//       price,
//       date,
//       status,
//       account,
//       rating,
//       createdAt,
//     },
//     index
//   ) => {
//     const isLast = index === data.length - 1;
//     const classes = isLast
//       ? "p-4"
//       : "p-4 border-b border-blue-gray-50";

//     return (
//       <tr key={name}>
//         <td className={classes}>
//           <div className="flex items-center gap-3">
//             <Avatar
//               src={image}
//               alt={name}
//               size="md"
//               className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
//             />
//             <Typography
//               variant="small"
//               color="blue-gray"
//               className="font-bold"
//             >
//               {name}
//             </Typography>
//           </div>
//         </td>
//         <td className={classes}>
//           <Typography
//             variant="small"
//             color="blue-gray"
//             className="font-normal"
//           >
//             {price}
//           </Typography>
//         </td>
//         <td className={classes}>
//           <Typography
//             variant="small"
//             color="blue-gray"
//             className="font-normal"
//           >
//             {date}
//           </Typography>
//         </td>
//         <td className={classes}>
//           <div className="w-max">
//             <Chip
//               size="sm"
//               variant="ghost"
//               value={status}
//               color={
//                 status === "paid"
//                   ? "green"
//                   : status === "pending"
//                   ? "amber"
//                   : "red"
//               }
//             />
//           </div>
//         </td>
//         <td className={classes}>
//           <div className="flex items-center gap-3">
//             <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
//               <Avatar
//                 src={
//                   account === "visa"
//                     ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
//                     : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
//                 }
//                 size="sm"
//                 alt={account}
//                 variant="square"
//                 className="h-full w-full object-contain p-1"
//               />
//             </div>
//             <div className="flex flex-col">
//               <Typography
//                 variant="small"
//                 color="blue-gray"
//                 className="font-normal capitalize"
//               >
//                 {account.split("-").join(" ")} {rating}
//               </Typography>
//               <Typography
//                 variant="small"
//                 color="blue-gray"
//                 className="font-normal opacity-70"
//               >
//                 {createdAt}
//               </Typography>
//             </div>
//           </div>
//         </td>
//         <td className={classes}>
//           <Tooltip content="Edit User">
//             <IconButton variant="text">
//               <PencilIcon className="h-4 w-4" />
//             </IconButton>
//           </Tooltip>
//         </td>
//       </tr>
//     );
//   }
// )}