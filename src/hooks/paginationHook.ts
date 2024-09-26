import { useState } from "react";

export const PaginationHook = ({ initLimit = 5 }: { initLimit?: number }) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [take, setTake] = useState<number>(initLimit);
  const [totalData, setTotalData] = useState<number>(0);

  const handleSetTotalPages = (totalData: number) => {
    setTotalData(totalData);
    setTotalPages(Math.ceil(totalData / take));
  };

  return {
    activePage,
    setActivePage,
    totalPages,
    setTotalPages,
    take,
    setTake,
    totalData,
    setTotalData,
    handleSetTotalPages,
  };
};
