import PostCard from "@/components/client/postCard";
import { categoryServices, postServices } from "@/services/serviceGenerator";
import { GetCategory } from "@/types/category.type";
import { GetPost } from "@/types/post.type";
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import { paginationHook } from "@/hook/paginationHook";
import { fetchDataHook } from "@/hook/fetchDataHook";
import Pagination from "@/components/client/pagination";
import { getQueryParams } from "@/helpers/appFunction";
import { useRouter } from "next/router";

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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { isLoad, setIsLoad } = fetchDataHook();
  const { activePage, totalPages, take, setActivePage, handleSetTotalPages } =
    paginationHook({ initLimit: 12 });
  const router = useRouter();

  const getDataPosts = async () => {
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
    await router.replace({
      pathname: "/club",
      query: { category: category },
    });
    setActiveCategory(category);
    getDataPosts();
  };

  useEffect(() => {
    getDataPosts();
  }, [activePage]);

  useEffect(() => {
    const categoryParams: Params = {
      skip: 0,
      take: "all",
    };
    if (activeCategory === null) {
      setActiveCategory(getQueryParams()["category"] || "");
    }
    getDataPosts();
    categoryServices.getItems(categoryParams).then(({ data: { data } }) => {
      setCategories(data);
    });
  }, []);

  const BtnCategory = ({ value, name  }: { value: string, name?:string }) => (
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
                    // title={title}
                    // slug={slug}
                    // body={body}
                    // categories={categories}
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
