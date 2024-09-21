import StoreCard from "@/components/client/StoreCard"
import { FetchDataHook } from "@/hooks/fetchDataHook";
import { PaginationHook } from "@/hooks/paginationHook";
import { productServices } from "@/services/serviceGenerator";
import { GetProduct } from "@/types/product.type";
import { Typography } from "@material-tailwind/react"
import { useEffect, useState } from "react";
import Search from "@/components/client/search";
import { SearchHook } from "@/hooks/searchHook";
import { useRouter } from "next/router";
import { getQueryParams } from "@/helpers/appFunction";
import ContentWrapper from "@/layouts/client/contentWrapper";

type Params = {
  skip: number;
  take: number | string;
  search?: string;
  filter?: any;
}

const Store = () => {
  const [products, setProducts] = useState<Omit<GetProduct, "createdAt">[]>([]);
  const { activePage, totalPages, take, setActivePage, handleSetTotalPages } = PaginationHook({ initLimit: 12 });
  const { isLoad, setIsLoad } = FetchDataHook();
  const { debounceValue, searchQuery, setSearchQuery } = SearchHook({ delay: 1000 });
  const router = useRouter();

  const getProductsData = async () => {
    const productParams: Params = {
      skip: activePage * take - take,
      take,
      search: getQueryParams()["search"] ? getQueryParams()["search"] : "",
    };
    setIsLoad(true);
    await productServices.getItems(productParams).then(({ data: { totalData, data } }) => {
      setProducts(data);
      handleSetTotalPages(totalData);
    })
    setIsLoad(false);
  }

  const handleSetSearchQuery = async (value: string) => {
    await router.replace({
      pathname: router.pathname,
      query: { search: value },
    });
    setSearchQuery(value);
  }

  useEffect(() => {
    getProductsData();
  }, [activePage, debounceValue]);

  return (
    <ContentWrapper className="bg-none">
        <Typography variant="h2" color="black" placeholder='Blog Page'>
          Store
        </Typography>
        <Search
          onChange={(e) => handleSetSearchQuery(e.target.value)}
          value={searchQuery || ""}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) =>
            <StoreCard key={product.id} {...product} />
          )}
        </div>
    </ContentWrapper>
  )
}

export default Store