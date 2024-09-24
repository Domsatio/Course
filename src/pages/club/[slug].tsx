import { postServices } from "@/services/serviceGenerator";
import { GetPost } from "@/types/post.type";
import { Typography } from "@material-tailwind/react";
import React, { FC } from "react";
import { GetServerSideProps } from "next";
import { dateFormater } from "@/helpers/date";
import { useRouter } from "next/router";
import ContentWrapper from "@/layouts/client/contentWrapper";
import Image from "next/image";

const DetailClubPage: FC<Omit<GetPost, 'id' | 'published' | 'slug'>> = ({ title, thumbnail, body, categories, createdAt }) => {
  const { push } = useRouter()

  return (
    <ContentWrapper>
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-3">
          {categories.map(({ categoryId, category }) => (
            <Typography
              key={categoryId}
              variant="small"
              className="text-[#c28833] flex capitalize cursor-pointer hover:text-[#c28833]/80"
              onClick={() =>
                push({
                  pathname: "/club",
                  query: { category: category.name },
                })
              }
            >
              {category.name}
            </Typography>
          ))}
        </div>
        <Typography variant="h2" color="black">
          {title}
        </Typography>
        <Typography variant="small" color="gray">
          {dateFormater(createdAt, "long")}
        </Typography>
        <div className="relative h-96 w-full">
          <Image
            src={thumbnail}
            alt={title + " thumbnail"}
            className="transform transition-transform duration-500 group-hover:scale-110"
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            fill
          />
        </div>
        <Typography variant="paragraph" className="text-left">
          {body}
        </Typography>
      </div>
    </ContentWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  try {
    const { data: { data } } = await postServices.getItem({ slug });
    return {
      props: data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: {},
      },
    };
  }
};

export default DetailClubPage
