import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getPublishedPosts,
  updatePost,
} from "@/controllers/post.controller";
import {
  createPostValidation,
  updatePostValidation,
} from "@/validations/post.validation";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "next-auth/jwt";
import { stringToSlug } from "@/utils/slug";

export default async function handlerPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (use your domain in production)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "POST") {
    if (!token || token.role !== "ADMIN") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    req.body.id = uuidv4();
    req.body.slug = stringToSlug(req.body.title);

    const { validatedData, errors } = createPostValidation(req.body);

    if (errors) {
      console.error("ERR: post - create = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await createPost(validatedData);
      console.info("Create post success");
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Create post success",
      });
    } catch (error) {
      console.error("ERR: post - create = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "PUT") {
    if (!token || token.role !== "ADMIN") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;
    req.body.slug = stringToSlug(req.body.title);

    const { validatedData, errors } = updatePostValidation(req.body);

    if (errors) {
      console.error("ERR: post - update = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await updatePost(id as string, validatedData);
      console.log("update post success");
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Update post success",
      });
    } catch (error) {
      console.error("ERR: post update = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "DELETE") {
    if (!token || token.role !== "ADMIN") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid id parameter" });
    }

    try {
      await deletePost(id);
      console.log("Delete post success");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Delete post success",
      });
    } catch (error) {
      console.error("ERR: post - delete = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "GET") {
    if (req.query.id || req.query.slug) {
      const { id, slug } = req.query;

      try {
        const data = await getPost((id as string) || (slug as string));
        console.info("Get post success");
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get post success",
          data,
        });
      } catch (error) {
        console.error("ERR: post - get = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    } else {
      try {
        const { skip, take, search = "", category = "", published } = req.query;
        if (token?.role !== "ADMIN") {
          const { totalData, data } = await getPublishedPosts(
            Number(skip),
            Number(take),
            search as string,
            category as string
          );
          return res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Get posts success",
            totalData,
            data,
          });
        } else {
          console.log("category", category);
          const { totalData, data } = await getPosts(
            Number(skip),
            Number(take),
            search as string,
            category as string,
            published as any
          );
          console.info("Get posts success");
          return res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Get posts success",
            totalData,
            data,
          });
        }
      } catch (error) {
        console.error("ERR: posts - get = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    }
  } else {
    res.status(405).end();
  }
}
