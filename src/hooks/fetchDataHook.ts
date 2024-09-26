import { useState } from "react";

export const FetchDataHook = () => {
  const [data, setData] = useState<any>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  return {
    data,
    setData,
    isLoad,
    setIsLoad,
    isError,
    setIsError,
  };
};
