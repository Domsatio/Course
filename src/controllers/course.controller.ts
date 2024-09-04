import prisma from "@/libs/prisma/db";
import { Course, UpdateCourse } from "@/types/course.type";

export const getCourses = async () => {
  return prisma.course.findMany({
  });
};

export const getCourse = async (id: string) => {
  return prisma.course.findUnique({
    where: { id },
  });
};

export const createCourse = async (data: Course) => {
  return prisma.course.create({ data });
};

export const updateCourse = async (id: string, data: UpdateCourse) => {
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
