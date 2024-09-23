import React, { useEffect, useState } from "react";
import { NullProof } from "@/helpers/appFunction";
import DataDetailPage, {
  LabelDetailPage,
  DetailPage,
} from "@/components/admin/DetailPage";
import { courseServices } from "@/services/serviceGenerator";
import EmblaCarousel from "@/components/admin/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Button } from "@material-tailwind/react";
import GenerateMetaData from "@/components/GenerateMetaData";

export default function DetailCourse() {
  const OPTIONS: EmblaOptionsType = {};
  const [videoUrl, setVideoUrl] = useState({
    video: "",
    thumbnailUrl: "",
    description: "",
    file: "",
  });
  const { data } = DataDetailPage({ service: courseServices });

  useEffect(() => {
    if (data.video?.length > 0) {
      setVideoUrl(data.video[0]);
    }
  }, [data]);

  return (
    <DetailPage title="Course">
      <GenerateMetaData title={`Admin | Detail ${NullProof({ input: data, params: "title" })}`} />
      <div className="flex flex-wrap gap-5">
        <div>
          <EmblaCarousel
            slides={data.video}
            options={OPTIONS}
            PreviewChild={({ item }) => (
              <iframe
                className="rounded-xl"
                width="550"
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
            <LabelDetailPage label="Description">
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
        </div>
        <div>
          <LabelDetailPage label="Title">
            {NullProof({ input: data, params: "title" })}
          </LabelDetailPage>
          <LabelDetailPage label="Description">
            {NullProof({ input: data, params: "description" })}
          </LabelDetailPage>
          <LabelDetailPage label="Published">
            {data.published &&
              NullProof({ input: data, params: "published" }) == true
              ? "Yes"
              : "No"}
          </LabelDetailPage>
        </div>
      </div>
    </DetailPage>
  );
}
