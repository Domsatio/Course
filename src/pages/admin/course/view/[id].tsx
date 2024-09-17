import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { NullProof } from "@/helpers/appFunction";
import DataDetailPage, {
  LabelDetailPage,
  DetailPage,
} from "@/components/DetailPage";
// import ReactPlayer from 'react-player/youtube'
import { courseServices } from "@/services/serviceGenerator";
import EmblaCarousel from "@/components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Button } from "@material-tailwind/react";

export default function view() {
  const OPTIONS: EmblaOptionsType = {};
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState({
    video: "",
    thumbnailUrl: "",
    description: "",
    file: "",
  });
  const { data } = DataDetailPage({ service: courseServices });

  useEffect(() => {
    if (data.image?.length > 0) {
      setImgUrl(data.image[0].image);
    }
    if (data.video?.length > 0) {
      setVideoUrl(data.video[0]);
    }
  }, [data]);

  return (
    <DetailPage title="Course">
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

{
  /* <EmblaCarousel slides={data.image} options={OPTIONS} PreviewChild={
              ({ item }) => (
                <img
                  className="h-[315px] w-[550px] max-w-full rounded-lg object-cover object-center"
                  src={item.image || ""}
                  alt=""
              />
              )
            }
            ThumChild={
              ({ item, onClick }) => (
                <img
                  key={item.id}
                  onClick={onClick}
                  src={item.image || ""}
                  className="h-20 w-20 cursor-pointer rounded-lg object-cover object-center"
                  alt="gallery-image"
                />
              )
            }
            /> */
}
{
  /* Video */
}
