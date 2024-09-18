import PostCard from "@/components/client/postCard";
import { postServices } from "@/services/serviceGenerator";
import { GetPost } from "@/types/post.type";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { paginationHook } from "@/hook/paginationHook";
import { fetchDataHook } from "@/hook/fetchDataHook";
import Pagination from "@/components/client/pagination";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import { se } from "date-fns/locale";
import { get } from "https";

type Params = {
  skip: number;
  take: number | string;
  search?: string;
  filter?: any;
  where?: string;
};

const ClientCourses = () => {
  const [posts, setPosts] = useState<
    Omit<GetPost, "published" | "createdAt">[]
  >([]);
  const { isLoad, setIsLoad } = fetchDataHook();
  const { activePage, totalPages, take, setActivePage, handleSetTotalPages } =
    paginationHook({ initLimit: 12 });

  useEffect(() => {
    const postParams: Params = {
      skip: activePage * take - take,
      take,
    };
    const getData = async () => {
      setIsLoad(true);
      await postServices
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
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="flex container flex-col justify-center flex-wrap gap-10 pt-10 pb-32 px-24">
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
                (data: Omit<GetPost, "published" | "createdAt">, index) => (
                  <PostCard
                    key={index}
                    props={{ ...data, href: `/course/${data.id}` }}
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
