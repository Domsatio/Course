import { NullProof } from "@/helpers/appFunction";
import { DetailPage, LabelDetailPage } from "@/components/admin/DetailPage";
import { CategoryPost, GetPost } from "@/types/post.type";
import { Chip } from "@material-tailwind/react";
import { GetServerSideProps } from "next/types";
import { postServices } from "@/services/serviceGenerator";
import { FC } from "react";
import Image from "next/image";
import GenerateMetaData from "@/components/GenerateMetaData";

const DetailPostAdmin: FC<GetPost> = (data) => {
  return (
    <DetailPage title="Post">
      <div className="space-y-5">
        <LabelDetailPage label="Thumbnail">
          <div className="relative h-96 w-full">
            <Image
              src={data.thumbnail}
              alt={data.title + " thumbnail"}
              className="transform transition-transform duration-500 group-hover:scale-110"
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              fill
            />
          </div>
        </LabelDetailPage>
        <GenerateMetaData title="Post Detail" desc={NullProof({ input: data, params: "title" }) || "Post Detail"} />
        <LabelDetailPage label="Title">
          {NullProof({ input: data, params: "title" })}
        </LabelDetailPage>
        <LabelDetailPage label="Slug">
          {NullProof({ input: data, params: "slug" })}
        </LabelDetailPage>
        <LabelDetailPage label="Body">
          <article
            className="prose  max-w-full"
            dangerouslySetInnerHTML={{
              __html: NullProof({ input: data, params: "body" }),
            }}
          ></article>
        </LabelDetailPage>
        <LabelDetailPage label="Categories">
          <div className="flex flex-wrap gap-1">
            {NullProof({
              input: data,
              params: "categories",
              isMap: true,
            }).map(({ category: { id, name } }: CategoryPost) => (
              <Chip key={id} value={name} size="sm" variant="outlined" />
            ))}
          </div>
        </LabelDetailPage>
        <LabelDetailPage label="Publised">
          <Chip
            variant="ghost"
            color={data.published ? "green" : "red"}
            size="sm"
            value={data.published ? "Published" : "Draft"}
            icon={
              <span
                className={`mx-auto mt-1 block h-2 w-2 rounded-full content-[''] ${data.published ? "bg-green-900" : "bg-red-900"
                  }`}
              />
            }
            className="max-w-min"
          />
        </LabelDetailPage>
        <LabelDetailPage label="Created At">
          {NullProof({ input: data, params: "createdAt", type: "date" })}
        </LabelDetailPage>
      </div>
    </DetailPage>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const { data: { data } } = await postServices.getItem({ id });
    return {
      props: data
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

export default DetailPostAdmin;
