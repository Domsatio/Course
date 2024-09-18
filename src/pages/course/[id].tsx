import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { courseServices } from "@/services/serviceGenerator";
import { Course } from "@/types/course.type";
import { NullProof } from "@/helpers/appFunction";
import { LabelDetailPage } from "@/components/admin/DetailPage";
import EmblaCarousel from "@/components/admin/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Button, Typography } from "@material-tailwind/react";

export default function DetailCourse({ data }: { data: Course }) {
  const OPTIONS: EmblaOptionsType = {};
  const [videoUrl, setVideoUrl] = useState<any>({
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
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="flex container flex-col justify-center items-center flex-wrap gap-5 pt-10 pb-32 p-5 lg:px-24">
        <div>
          <Typography variant="h2" color="black">
            {NullProof({ input: data, params: "title" })}
          </Typography>
          <LabelDetailPage label="" className="mb-5">
            {NullProof({ input: data, params: "description" })}
          </LabelDetailPage>
        </div>
        <EmblaCarousel
          slides={data.video}
          options={OPTIONS}
          PreviewChild={({ item }) => (
            <iframe
              className="rounded-xl"
              width="560"
              height="315"
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
        <div className="mt-5">
          <LabelDetailPage label="Vidio explanation">
            {NullProof({ input: videoUrl, params: "description" })}
          </LabelDetailPage>
          {videoUrl.file && (
            <LabelDetailPage label="Materi PDF">
              <Button>
                <a href={videoUrl.file} target="_blank" rel="noreferrer">
                  See File
                </a>
              </Button>
            </LabelDetailPage>
          )}
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const res = await courseServices.getItem({ id: id });
    return {
      props: {
        data: res.data.data,
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
