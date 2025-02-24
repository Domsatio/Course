import { FC, Fragment, useEffect, useState, useRef } from "react";
import { GetServerSideProps } from "next";
import { courseServices } from "@/services/serviceGenerator";
import { Course } from "@/types/course.type";
import { NullProof } from "@/helpers/appFunction";
import { LabelDetailPage } from "@/components/admin/DetailPage";
import EmblaCarousel from "@/components/admin/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import ContentWrapper from "@/layouts/client/contentWrapper";
import Link from "next/link";
import Image from "next/image";
import GenerateMetaData from "@/components/GenerateMetaData";
import ReactPlayer from "react-player";
import SubscribersOnly from "./subscribe-warning";

type VideoUrl = {
  video: string;
  thumbnailUrl?: string;
  description: string;
  file?: string;
};

const DetailCoursePage: FC<Course> = (data) => {
  const OPTIONS: EmblaOptionsType = {};
  const [videoUrl, setVideoUrl] = useState<VideoUrl>({
    video: "",
    thumbnailUrl: "",
    description: "",
    file: "",
  });

  // const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (data.video?.length > 0) {
      setVideoUrl(data.video[0]);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(iframeRef.current?.name, "videoUrl");
  // }, [videoUrl]);

  return (
    <Fragment>
      <GenerateMetaData
        title={NullProof({ input: data, params: "title" })}
        desc={`Detail ${NullProof({ input: data, params: "title" })}`}
        thumbnail={data.thumbnail}
      />
      <ContentWrapper>
        <Typography variant="h2" color="black">
          {NullProof({ input: data, params: "title" })}
        </Typography>
        {/* <SubscribersOnly /> */}
        <Typography variant="paragraph">
          {NullProof({ input: data, params: "description" })}
        </Typography>
        <EmblaCarousel
          slides={data.video}
          options={OPTIONS}
          PreviewChild={({ item }) => (
            <iframe
              name={item.video}
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
            <Image
              key={item.id}
              onClick={onClick}
              src={item.thumbnailUrl || ""}
              className="cursor-pointer rounded-lg object-cover object-center"
              width={142}
              height={80}
              alt="gallery-image"
              priority
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
                Download
              </Link>
            </Button>
          </LabelDetailPage>
        )}
      </ContentWrapper>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  // const session = context.req.cookies.session
  // console.log(session, 'sesssssion');

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/course/subscribe-warning",
  //       permanent: false,
  //     },
  //     };
  // }
  try {
    const {
      data: { data },
    } = await courseServices.getItem({ slug });
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

export default DetailCoursePage;
