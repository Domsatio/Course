import { postServices } from "@/services/serviceGenerator";
import { GetPost } from "@/types/post.type";
import { Typography } from "@material-tailwind/react";
import React, { FC } from "react";
import { GetServerSideProps } from "next";
import { dateFormater } from "@/helpers/date";
import ContentWrapper from "@/layouts/client/contentWrapper";

const DetailClub: FC<{ data: Omit<GetPost, "id" | "published" | "slug"> }> = ({
  data: { title, body, categories, createdAt },
}) => {
  return (
    <ContentWrapper>
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-3">
          {categories.map(({ categoryId, category }) => (
            <Typography
              key={categoryId}
              variant="small"
              className="text-[#c28833] flex capitalize group-hover:text-[#c28833]/80"
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
        <Typography variant="paragraph" className="px-56 text-left">
          {body}
        </Typography>
      </div>
    </ContentWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;

  if (typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    const {
      data: { data },
    } = await postServices.getItem({ slug });
    return {
      props: {
        data: data,
      },
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

export default DetailClub;
