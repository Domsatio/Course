import { categoryServices, postServices } from "@/services/serviceGenerator";
import { GetCategory } from "@/types/category.type";
import { GetPost } from "@/types/post.type";
import { Button, Typography } from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import { PaginationHook } from "@/hooks/paginationHook";
import { FetchDataHook } from "@/hooks/fetchDataHook";
import Pagination from "@/components/client/pagination";
import { getQueryParams } from "@/helpers/appFunction";
import { useRouter } from "next/router";
import CardItem from "@/components/client/CardItem";

type Params = {
  skip: number;
  take: number | string;
  search?: string;
  filter?: any;
  category?: string;
};

const Club = () => {
  const [posts, setPosts] = useState<Omit<GetPost, "published" | "createdAt">[]>([]);
  const [categories, setCategories] = useState<Omit<GetCategory, "posts">[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { isLoad, setIsLoad } = FetchDataHook();
  const { activePage, totalPages, take, setActivePage, handleSetTotalPages } = PaginationHook({ initLimit: 12 });
  const { replace } = useRouter();

  const getPostsData = async () => {
    const postParams: Params = {
      skip: activePage * take - take,
      take,
      category: getQueryParams()["category"]
        ? getQueryParams()["category"]
        : "",
    };
    setIsLoad(true);
    await postServices
      .getItems(postParams)
      .then(({ data: { totalData, data } }) => {
        setPosts(data);
        handleSetTotalPages(totalData);
      });
    setIsLoad(false);
  };

  const handleSetActiveCategory = async (category: string) => {
    await replace({
      pathname: "/club",
      query: { category: category },
    });
    setActiveCategory(category);
    getPostsData();
  };

  useEffect(() => {
    getPostsData();
  }, [activePage]);

  useEffect(() => {
    const categoryParams: Params = {
      skip: 0,
      take: "all",
    };
    if (activeCategory === null) {
      setActiveCategory(getQueryParams()["category"] || "");
    }
    getPostsData();
    categoryServices.getItems(categoryParams).then(({ data: { data } }) => {
      setCategories(data);
    });
  }, []);

  const BtnCategory = ({ value, name }: { value: string, name?: string }) => (
    <Button
      size="sm"
      variant={`${activeCategory === value ? "filled" : "outlined"}`}
      className="rounded-full cursor-pointer capitalize border-gray-400"
      onClick={() => handleSetActiveCategory(value)}
    >
      {name || value}
    </Button>
  );

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f4f4f4] justify-between py-24">
      <section className="flex flex-col container 2xl:max-w-[75rem] justify-center flex-wrap gap-10 p-10 rounded-3xl bg-white">
        <Typography variant="h2" color="black" placeholder='Blog Page'>
          Club
        </Typography>

        <div className="flex gap-2 flex-wrap">
          {categories.length > 0 &&
            <BtnCategory value="" name="All" />
          }
          {categories.map(({ id, name }) => (
            <BtnCategory key={id} value={name} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoad ? (
            <Fragment>
              {Array.from({ length: 6 }, (_, i) => (
                <CardSkeleton key={i} />
              ))}
            </Fragment>
          ) : (
            <Fragment>
              {posts.length > 0 ? posts.map((data) => (
                <CardItem
                  key={data.id}
                  props={{ ...data, href: `/club/${data.slug}` }}
                  category={
                    <div className="flex flex-wrap gap-1 text-[#c28833] items-center capitalize group-hover:text-[#c28833]/80">
                      {data.categories.map(({ category }, i) => (
                        <Fragment key={category.id}>
                          {i !== 0 && <span>&nbsp;•&nbsp;</span>}
                          <Typography
                            variant="small"
                          >
                            {category.name}
                          </Typography>
                        </Fragment>
                      ))}
                    </div>
                  }
                />
              )) : (
                <Typography color="gray">
                  No post found
                </Typography>
              )}
            </Fragment>
          )}
        </div>
        {posts.length > 0 && <Pagination
          activePage={activePage}
          setActivePage={setActivePage}
          totalPages={totalPages}
        />}
      </section>
    </main>
  );
};

export default Club;
