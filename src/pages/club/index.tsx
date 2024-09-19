import PostCard from "@/components/client/postCard";
import { categoryServices, postServices } from "@/services/serviceGenerator";
import { GetCategory } from "@/types/category.type";
import { GetPost } from "@/types/post.type";
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import { paginationHook } from "@/hook/paginationHook";
import {
  fetchDataHook,
  fetchDataHook as fetchCategoryHook,
} from "@/hook/fetchDataHook";
import { searchHook } from "@/hook/searchHook";
import Pagination from "@/components/client/pagination";
import { getQueryParams } from "@/helpers/appFunction";
import Search from "@/components/client/search";
import { useRouter } from "next/router";
import CategorySkeleton from "@/components/Skeleton/CategorySkeleton";

type Params = {
  skip: number;
  take: number | string;
  search?: string;
  filter?: any;
  category?: string;
};

const ClientView = () => {
  const [posts, setPosts] = useState<
    Omit<GetPost, "published" | "createdAt">[]
  >([]);
  const [categories, setCategories] = useState<Omit<GetCategory, "posts">[]>(
    []
  );
  const [activeCategory, setActiveCategory] = useState<string | null>("");
  const { isLoad, setIsLoad } = fetchDataHook();
  const { isLoad: isCategoryLoad, setIsLoad: setIsLoadCategory } =
    fetchCategoryHook();
  const { activePage, totalPages, take, setActivePage, handleSetTotalPages } =
    paginationHook({ initLimit: 12 });
  const { debounceValue, searchQuery, setSearchQuery } = searchHook({
    delay: 800,
  });
  const router = useRouter();

  const getDataPosts = async () => {
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
    await router.replace({
      pathname: "/club",
      query: { ...getQueryParams(), category: category },
    });
    setActiveCategory(category);
    getDataPosts();
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
        await router.replace({
          pathname: "/club",
          query: { ...getQueryParams(), search: debounceValue || "" },
        });
        getDataPosts();
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
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="flex container flex-col justify-center flex-wrap gap-10 pt-10 pb-32 px-24">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoad ? (
            <React.Fragment>
              {Array.from({ length: 6 }, (_, i) => (
                <CardSkeleton key={i} />
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {posts.map(
                (data: Omit<GetPost, "published" | "createdAt">, index) => (
                  <PostCard
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
              )}
            </React.Fragment>
          )}
        </div>
        <Pagination
          activePage={activePage}
          setActivePage={setActivePage}
          totalPages={totalPages}
        />
      </section>
    </main>
  );
};

export default ClientView;
