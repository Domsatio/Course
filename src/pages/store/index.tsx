import StoreCard from "@/components/client/StoreCard"
import { FetchDataHook } from "@/hooks/fetchDataHook";
import { PaginationHook } from "@/hooks/paginationHook";
import { productServices } from "@/services/serviceGenerator";
import { GetProduct } from "@/types/product.type";
import { Typography } from "@material-tailwind/react"
import { useEffect, useState } from "react";

type Params = {
  skip: number;
  take: number | string;
  search?: string;
  filter?: any;
}

const ClientStorePage = () => {
  const [products, setProducts] = useState<Omit<GetProduct, "createdAt">[]>([]);
  const { activePage, totalPages, take, setActivePage, handleSetTotalPages } = PaginationHook({ initLimit: 12 });
  const { isLoad, setIsLoad } = FetchDataHook();

  const getProductsData = async () => {
    const productParams: Params = {
      skip: activePage * take - take,
      take,
    };
    setIsLoad(true);
    await productServices.getItems(productParams).then(({ data: { totalData, data } }) => {
      setProducts(data);
      handleSetTotalPages(totalData);
    })
    setIsLoad(false);
  }

  useEffect(() => {
    getProductsData();
  }, [activePage])

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f4f4f4] justify-between py-24">
      <section className="flex flex-col container 2xl:max-w-[75rem] justify-center flex-wrap gap-10 p-10 rounded-3xl">
        <Typography variant="h2" color="black" placeholder='Blog Page'>
          Store
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) =>
            <StoreCard key={product.id} {...product} />
          )}
        </div>
      </section>
    </main>
  )
}

export default ClientStorePage