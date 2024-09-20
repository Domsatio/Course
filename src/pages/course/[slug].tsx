import { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { courseServices } from "@/services/serviceGenerator";
import { Course } from "@/types/course.type";
import { NullProof } from "@/helpers/appFunction";
import { LabelDetailPage } from "@/components/admin/DetailPage";
import EmblaCarousel from "@/components/admin/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";

type VideoUrl = {
  video: string;
  thumbnailUrl: string;
  description: string;
  file: string;
}

const DetailCourse: FC<Course> = (data) => {
  const OPTIONS: EmblaOptionsType = {};
  const [videoUrl, setVideoUrl] = useState<VideoUrl>({
    video: "",
    thumbnailUrl: "",
    description: "",
    file: "",
  });

  useEffect(() => {
    if (data.video?.length > 0) {
      setVideoUrl(data.video[0]);
    }
  }, [data]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f4f4f4] justify-between py-24">
      <section className="flex flex-col container 2xl:max-w-[75rem] justify-center flex-wrap gap-10 p-10 rounded-3xl bg-white">
        <Typography variant="h2" color="black">
          {NullProof({ input: data, params: "title" })}
        </Typography>
        <Typography variant="paragraph">
          {NullProof({ input: data, params: "description" })}
        </Typography>
        <EmblaCarousel
          slides={data.video}
          options={OPTIONS}
          PreviewChild={({ item }) => (
            <iframe
              className="rounded-xl"
              width="864"
              height="486"
              src={`https://www.youtube.com/embed/${item.video || ""}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          ThumChild={({ item, onClick }) => (
            <img
              key={item.id}
              onClick={onClick}
              src={item.thumbnailUrl || ""}
              className="h-20 w-20 cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
            />
          )}
          onScroll={(i) => {
            if (data.video) {
              setVideoUrl(data.video[i]);
            }
          }}
        />
        <LabelDetailPage label="Video Explanation">
          {NullProof({ input: videoUrl, params: "description" })}
        </LabelDetailPage>
        {videoUrl.file && (
          <LabelDetailPage label="Attachments">
            <Button>
              <Link href={videoUrl.file} target="_blank" rel="noreferrer">
                See File
              </Link>
            </Button>
          </LabelDetailPage>
        )}
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  try {
    const { data: { data } } = await courseServices.getItem({ slug });
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

export default DetailCourse;
