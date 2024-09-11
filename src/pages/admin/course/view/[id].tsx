import React, { useEffect, useState } from "react";
import Image from "next/image";
import {  NullProof } from "@/helpers/appFunction";
import DataDetailPage, {LabelDetailPage, DetailPage} from "@/components/DetailPage";
// import ReactPlayer from 'react-player/youtube'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import dynamic from "next/dynamic";
import { Carousel } from "@material-tailwind/react";
import { courseServices } from "@/services/serviceGenerator";

export default function view() {
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState({
    video: "",
    thumbnailUrl: "",
    description: "",
  })
  const { data } = DataDetailPage({ service: courseServices }); 
  useEffect(() => {
    if(data.image?.length > 0) {
        setImgUrl(data.image[0].image);
    }
    if(data.video?.length > 0) {
        setVideoUrl(data.video[0]);
    }
  }, [data]);

  return (
    <DetailPage title="Course">
      <div className="flex flex-wrap flex-col">
        <div className="flex flex-wrap gap-5">
          <div className="grid gap-4">
            <div>
              <img
                //   width={400}
                //   height={400}
                className="h-[315px] w-[500px] max-w-full rounded-lg object-cover object-center"
                src={imgUrl || ""}
                alt=""
                //   loading="lazy"
              />
            </div>
            {/* <Carousel loop={true}  className="w-[500px]"> */}
            <div className="grid grid-cols-4">
              {data.image?.length  &&
                data.image?.map((imgelink: any, index: number) => (
                  <div key={index}>
                    <img
                      onClick={(e) => {
                        e.preventDefault();
                        setImgUrl(imgelink.image);
                      }}
                      src={imgelink.image || ""}
                      className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                      alt="gallery-image"
                    />
                  </div>
                ))}
            </div>
            {/* </Carousel> */}
          </div>
          <div className="grid gap-4 mt-5 lg:mt-0">
            <div className="h-[315px] w-[500px]">
              <iframe
                className="rounded-xl"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoUrl.video || ""}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              {/* <ReactPlayer url={`https://www.youtube.com/watch?v=${videoUrl || ""}`} controls/> */}
            </div>
            <div className="flex gap-4 max-w-[550px] overflow-x-auto">
              {Array.isArray(data.video) &&
                data?.video.map((videolink: any, index: number) => {
                  return (
                      <img
                        key={index}
                        onClick={() => {
                            setVideoUrl({...videolink});
                        }}
                        src={videolink.thumbnailUrl || ""}
                        className="h-20 w-24 cursor-pointer rounded-lg object-cover object-center"
                        alt="gallery-image"
                      />
                  );
                })}
            </div>
            <div>
                <LabelDetailPage label="Description" position="vertikal">
                    {NullProof({ input: videoUrl, params: "description" })}
                </LabelDetailPage>
            </div>
          </div>
        </div>
        <div>
        <LabelDetailPage label="Title" position="vertikal">
            {NullProof({ input: data, params: "title" })}
          </LabelDetailPage>
          <LabelDetailPage label="Deacription" position="vertikal">
            {NullProof({ input: data, params: "description" })}
          </LabelDetailPage>
          <LabelDetailPage label="Published" position="vertikal">
            {data.published && NullProof({ input: data, params: "published" }) == true ? "Yes" : "No"}
          </LabelDetailPage>
        </div>
      </div>
    </DetailPage>
  );
}
