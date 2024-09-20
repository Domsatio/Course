import PostCard from "@/components/client/postCard";
import { courseServices } from "@/services/serviceGenerator";
import { Course } from "@/types/course.type";
import { Typography } from "@material-tailwind/react";
import React, { useCallback, useEffect, useState } from "react";
import { paginationHook } from "@/hook/paginationHook";
import { fetchDataHook } from "@/hook/fetchDataHook";
import Pagination from "@/components/client/pagination";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import Search from "@/components/client/search";
import { searchHook } from "@/hook/searchHook";
import { getQueryParams } from "@/helpers/appFunction";
import { useRouter } from "next/router";
import ContentWrapper from "@/layouts/client/contentWrapper";

type Params = {
  skip: number;
  take: number | string;
  search?: string;
  filter?: any;
  where?: string;
};

const ClientCourses = () => {
  const [posts, setPosts] = useState<Course[]>([]);
  const { isLoad, setIsLoad } = fetchDataHook();
  const { activePage, totalPages, take, setActivePage, handleSetTotalPages } =
    paginationHook({ initLimit: 12 });
  const { debounceValue, searchQuery, setSearchQuery } = searchHook({
    delay: 1000,
  });
  const router = useRouter();

  const setSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
    },
    [searchQuery]
  );

  const getData = async () => {
    const postParams: Params = {
      skip: activePage * take - take,
      take,
      search: getQueryParams()["search"] ? getQueryParams()["search"] : "",
    };
    setIsLoad(true);
    await courseServices
      .getItems(postParams)
      .then(({ data: { totalData, data } }) => {
        setPosts(data);
        handleSetTotalPages(totalData);
      });
    setIsLoad(false);
  };

  const handleSetActivePage = async (page: number) => {
    setActivePage(page);
    getData();
  };

  useEffect(() => {
    setIsLoad(true);
    if (!searchQuery) {
      setSearch(getQueryParams()["search"] ? getQueryParams()["search"] : "");
    } else {
      getData();
    }
  }, []);

  useEffect(() => {
    if (debounceValue !== null) {
      const handleGetData = async () => {
        await router.replace({
          pathname: "/course",
          query: { search: debounceValue },
        });
        getData();
      };
      handleGetData();
    }
  }, [debounceValue]);

  return (
    <ContentWrapper>
      <Typography variant="h2" color="black" placeholder="Blog Page">
        Courses
      </Typography>
      <div className="my-2">
        <Search
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery || ""}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoad ? (
          <React.Fragment>
            {Array.from({ length: 6 }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {posts.map((data: Course, index) => (
              <PostCard
                key={index}
                props={{ ...data, href: `/course/${data.id}` }}
              />
            ))}
          </React.Fragment>
        )}
      </div>
      <Pagination
        activePage={activePage}
        setActivePage={(e) => handleSetActivePage(e)}
        totalPages={totalPages}
      />
    </ContentWrapper>
  );
};

export default ClientCourses;
