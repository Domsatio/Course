import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "@/controllers/course.controller";
import {
  createCourseValidation,
  updateCourseValidation,
} from "@/validations/course.validation";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (req.method === "POST") {
    if (!token || token.role !== "ADMIN") {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    req.body.id = uuidv4();

    const { validatedData, errors } = createCourseValidation(req.body);

    if (errors) {
      console.error("ERR: course - create = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await createCourse(validatedData);
      console.info("Create course success");
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Create course success",
      });
    } catch (error) {
      console.error("ERR: course - create = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  } else if (req.method === "PUT") {
    if (!token || token.role !== "ADMIN") {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;

    const { validatedData, errors } = updateCourseValidation(req.body);

    if (errors) {
      console.error("ERR: course - update = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await updateCourse(id as string, validatedData);
      console.info("Update course success");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Update course success",
      });
    } catch (error) {
      console.error("ERR: course - update = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  } else if (req.method === "DELETE") {
    if (!token || token.role !== "ADMIN") {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;

    try {
      await deleteCourse(id as string);
      console.info("Delete course success");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Delete course success",
      });
    } catch (error) {
      console.error("ERR: course - delete = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  } else if (req.method === "GET") {
    if (req.query.id) {
      const { id } = req.query;

      try {
        const data = await getCourse(id as string);
        console.info("Get course success");
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get course success",
          data,
        });
      } catch (error) {
        console.error("ERR: course - get = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    } else {
      try {
        const data = await getCourses();
        console.info("Get courses success");
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get courses success",
          data,
        });
      } catch (error) {
        console.error("ERR: courses - get = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    }
  } else {
    res.status(405).end();
  }
}
