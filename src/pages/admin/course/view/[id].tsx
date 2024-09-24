import React, { FC, useEffect, useState } from "react";
import { NullProof } from "@/helpers/appFunction";
import DataDetailPage, {
  LabelDetailPage,
  DetailPage,
} from "@/components/admin/DetailPage";
import { courseServices } from "@/services/serviceGenerator";
import EmblaCarousel from "@/components/admin/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Button, Chip } from "@material-tailwind/react";
import Link from "next/link";

type VideoUrl = {
  video: string;
  thumbnailUrl?: string;
  description: string;
  file?: string;
}

const DetailCourse: FC = () => {
  const OPTIONS: EmblaOptionsType = {};
  const [videoUrl, setVideoUrl] = useState<VideoUrl>({
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
      <div className="space-y-5">
        <LabelDetailPage label="Title">
          {NullProof({ input: data, params: "title" })}
        </LabelDetailPage>
        <LabelDetailPage label="Description">
          {NullProof({ input: data, params: "description" })}
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
        <LabelDetailPage label="Video Description">
          {NullProof({ input: videoUrl, params: "description" })}
        </LabelDetailPage>
        {videoUrl.file && (
          <LabelDetailPage label="Attachment">
            <Button>
              <Link href={videoUrl.file} target="_blank" rel="noreferrer">
                Download
              </Link>
            </Button>
          </LabelDetailPage>
        )}
      </div>
    </DetailPage>
  );
}

export default DetailCourse;
