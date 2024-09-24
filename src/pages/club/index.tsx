import { categoryServices, postServices } from "@/services/serviceGenerator";
import { GetCategory } from "@/types/category.type";
import { GetPost } from "@/types/post.type";
import { Button, Typography } from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import { PaginationHook } from "@/hooks/paginationHook";
import { FetchDataHook, FetchDataHook as FetchCategoryHook } from "@/hooks/fetchDataHook";
import { SearchHook } from "@/hooks/searchHook";
import Pagination from "@/components/client/Pagination";
import { getQueryParams } from "@/helpers/appFunction";
import Search from "@/components/client/search";
import { useRouter } from "next/router";
import CardItem from "@/components/client/CardItem";
import CategorySkeleton from "@/components/Skeleton/CategorySkeleton";
import ContentWrapper from "@/layouts/client/contentWrapper";

type Params = {
  skip: number;
  take: number | string;
  search?: string;
  filter?: any;
  category?: string;
};

const ClientClubPage = () => {
  const [posts, setPosts] = useState<Omit<GetPost, "published" | "createdAt">[]>([]);
  const [categories, setCategories] = useState<Omit<GetCategory, "posts">[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>("");
  const { isLoad, setIsLoad } = FetchDataHook();
  const { isLoad: isCategoryLoad, setIsLoad: setIsLoadCategory } = FetchCategoryHook();
  const { activePage, totalPages, take, setActivePage, handleSetTotalPages } = PaginationHook({ initLimit: 12 });
  const { debounceValue, searchQuery, setSearchQuery } = SearchHook({ delay: 800, });
  const { replace } = useRouter();

  const getPostsData = async () => {
    const postParams: Params = {
      skip: activePage * take - take,
      take,
      search: getQueryParams()["search"] || "",
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
      query: { ...getQueryParams(), category: category },
    });
    setActiveCategory(category);
    getPostsData();
  };

  useEffect(() => {
    setIsLoad(true);
    setIsLoadCategory(true);
    setActiveCategory(getQueryParams()["category"] || "");
    const categoryParams: Params = {
      skip: 0,
      take: "all",
    };
    categoryServices.getItems(categoryParams).then(({ data: { data } }) => {
      setCategories(data);
      setIsLoadCategory(false);
    });
  }, []);

  useEffect(() => {
    if (searchQuery === null) {
      setSearchQuery(getQueryParams()["search"] || "");
    } else {
      const handleGetData = async () => {
        await replace({
          pathname: "/club",
          query: { ...getQueryParams(), search: debounceValue || "" },
        });
        getPostsData();
      };
      handleGetData();
    }
  }, [debounceValue, activePage]);

  const BtnCategory = ({ value, name }: { value: string; name?: string }) => (
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
    <ContentWrapper>
      <Typography variant="h2" color="black" placeholder="Blog Page">
        Club
      </Typography>
      {isCategoryLoad ? (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <CategorySkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {categories.length > 0 && <BtnCategory value="" name="All" />}
          {categories.map(({ id, name }) => (
            <BtnCategory key={id} value={name} />
          ))}
        </div>
      )}

      <Search
        value={searchQuery || ""}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center lg:place-items-start">
        {isLoad ? (
          <Fragment>
            {Array.from({ length: 6 }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {posts.length > 0 ? posts.map(
              (data: Omit<GetPost, "published" | "createdAt">, index) => (
                <CardItem
                  key={index}
                  props={{ ...data, href: `/club/${data.slug}` }}
                  category={
                    <div className="flex flex-wrap gap-2">
                      {data.categories.map(({ category }, i) => (
                        <Typography
                          key={i}
                          variant="small"
                          className="text-[#c28833] flex capitalize group-hover:text-[#c28833]/80"
                        >
                          {category.name}
                        </Typography>
                      ))}
                    </div>
                  }
                />
              )
            ) : (
              <Typography variant="small" color="gray">
                No posts found
              </Typography>
            )}
          </Fragment>
        )}
      </div>
      {posts.length > 0 &&
        <Pagination
          activePage={activePage}
          setActivePage={setActivePage}
          totalPages={totalPages}
        />
      }
    </ContentWrapper>
  );
};

export default ClientClubPage;
