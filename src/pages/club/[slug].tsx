import { postServices } from "@/services/serviceGenerator";
import { GetPost } from "@/types/post.type";
import { Typography } from "@material-tailwind/react";
import React, { FC } from "react";
import { GetServerSideProps} from "next";
import { dateFormater } from "@/helpers/date";
import { useRouter } from "next/router";
import ContentWrapper from "@/layouts/client/contentWrapper";
import GenerateMetaData from "@/components/GenerateMetaData";


const DetailClubPage: FC<Omit<GetPost, 'id' | 'published' | 'slug'>> = ({ title, body, categories, createdAt }) => {
  const { push } = useRouter()

  return (
    <ContentWrapper>
      <GenerateMetaData title={title} desc={`Detail ${title}`}/>
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
        <article
            className="prose lg:px-56"
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          ></article>
      </div>
    </ContentWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  try {
    const {
      data: { data },
    } = await postServices.getItem({ slug });
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
