import prisma from "@/libs/prisma/db";
import { Course, UpdateCourse } from "@/types/course.type";
import axios from "axios";
import { convertStringToBoolean } from "@/helpers/appFunction";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const getThumbnail = async (video: any[]) => {
  let ArrayVideo = [];
  if (Array.isArray(video) && video.length > 0) {
    ArrayVideo = await Promise.all(
      video.map(async (video: any) => {
        try {
          const data = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${video.video}&key=${apiKey}`
          );
          const thumbnailUrl =
            data?.data.items[0].snippet.thumbnails.default.url;
          return { ...video, thumbnailUrl };
        } catch (error) {
          console.log(error);
          return video;
        }
      })
    );
  }
  return ArrayVideo;
};

export const getCourses = async (
  skip: number = 0,
  take: number = 5,
  search: string = "",
  published: boolean | string | undefined
) => {
  let whereCondition: any = {
    OR: [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  };

  if (published) {
    whereCondition.published = convertStringToBoolean(published as string);
  }
  return prisma.$transaction(
    async (tx) => {
      const totalData = await tx.course.count({
        where: whereCondition,
      });

      const data = await tx.course.findMany({
        where: whereCondition,
        skip,
        take,
        orderBy: {
          title: "asc",
        },
      });

      return { totalData, data };
    },
    { maxWait: 5000, timeout: 20000 }
  );
};

export const getCourse = async (param: string) => {
  return prisma.course.findFirst({
    where: {
      OR: [{ id: param }, { slug: param }],
    },
  });
};

export const createCourse = async (data: Course) => {
  const video = await getThumbnail(data.video);
  data.video = video;
  return prisma.course.create({ data });
};

export const updateCourse = async (id: string, data: UpdateCourse) => {
  const video = await getThumbnail(data.video || []);
  data.video = video;
  return prisma.course.update({
    where: { id },
    data,
  });
};

export const deleteCourse = async (id: string) => {
  return prisma.course.delete({
    where: { id },
  });
};
