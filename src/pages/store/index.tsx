import StoreCard from "@/components/client/StoreCard";
import { FetchDataHook } from "@/hooks/fetchDataHook";
import { PaginationHook } from "@/hooks/paginationHook";
import { productServices } from "@/services/serviceGenerator";
import { GetProduct } from "@/types/product.type";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Search from "@/components/client/search";
import { SearchHook } from "@/hooks/searchHook";
import { useRouter } from "next/router";
import { getQueryParams } from "@/helpers/appFunction";
import ContentWrapper from "@/layouts/client/contentWrapper";
import StoreSkeletonCard from "@/components/Skeleton/store.skeleton";
import { cn } from "@/libs/cn";
import GenerateMetaData from "@/components/GenerateMetaData";

type Params = {
  skip: number;
  take: number | string;
  search?: string;
  filter?: any;
};

const ClientStorePage = () => {
  const [products, setProducts] = useState<Omit<GetProduct, "createdAt">[]>([]);
  const { activePage, totalPages, take, setActivePage, handleSetTotalPages } =
    PaginationHook({ initLimit: 12 });
  const { isLoad, setIsLoad } = FetchDataHook();
  const { debounceValue, searchQuery, setSearchQuery } = SearchHook({
    delay: 1000,
  });
  const { replace, pathname } = useRouter();

  const getProductsData = async () => {
    setIsLoad(true);
    const productParams: Params = {
      skip: activePage * take - take,
      take,
      search: getQueryParams()["search"] ? getQueryParams()["search"] : "",
    };
    setIsLoad(true);
    await productServices
      .getItems(productParams)
      .then(({ data: { totalData, data } }) => {
        setProducts(data);
        handleSetTotalPages(totalData);
      });
    setIsLoad(false);
  };

  const handleSetSearchQuery = async (value: string) => {
    await replace({
      pathname: pathname,
      query: { search: value },
    });
    setSearchQuery(value);
  };

  useEffect(() => {
    getProductsData();
  }, [activePage, debounceValue]);

  return (
    <ContentWrapper className="bg-transparent">
      <GenerateMetaData title="Store" desc="Store Page" />
      <Typography variant="h2" color="black" placeholder="Blog Page">
        Store
      </Typography>
      <Search
        onChange={(e) => handleSetSearchQuery(e.target.value)}
        value={searchQuery || ""}
      />
      <div
        className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", {
          "place-items-center lg:place-items-start": !isLoad,
        })}
      >
        {isLoad
          ? Array.from({ length: 12 }).map((_, index) => (
            <StoreSkeletonCard key={index} />
          ))
          : products.map((product) => (
            <StoreCard key={product.id} {...product} />
          ))}
      </div>
    </ContentWrapper>
  );
};

export default ClientStorePage;
