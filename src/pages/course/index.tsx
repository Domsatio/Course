import PostCard from "@/components/client/CardItem";
import { courseServices } from "@/services/serviceGenerator";
import { Course } from "@/types/course.type";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { PaginationHook } from "@/hooks/paginationHook";
import { FetchDataHook } from "@/hooks/fetchDataHook";
import Pagination from "@/components/client/pagination";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";

type Params = {
  skip: number;
  take: number | string;
  search?: string;
  filter?: any;
  where?: string;
};

const ClientCourses = () => {
  const [posts, setPosts] = useState<Course[]>([]);
  const { isLoad, setIsLoad } = FetchDataHook();
  const { activePage, totalPages, take, setActivePage, handleSetTotalPages } =
    PaginationHook({ initLimit: 12 });

  useEffect(() => {
    const postParams: Params = {
      skip: activePage * take - take,
      take,
    };
    const getData = async () => {
      setIsLoad(true);
      await courseServices
        .getItems(postParams)
        .then(({ data: { totalData, data } }) => {
          setPosts(data);
          handleSetTotalPages(totalData);
        });
      setIsLoad(false);
    };
    getData();
  }, [activePage]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f4f4f4] justify-between py-24">
      <section className="flex flex-col container 2xl:max-w-[75rem] justify-center flex-wrap gap-10 p-10 rounded-3xl bg-white">
        <Typography variant="h2" color="black" placeholder="Blog Page">
          Courses
        </Typography>

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
                (data: Course, index) => (
                  <PostCard
                    key={index}
                    props={{ ...data, href: `/course/${data.slug}` }}
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

export default ClientCourses;
