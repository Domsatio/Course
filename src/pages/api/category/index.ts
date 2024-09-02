import {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/controllers/category.controller";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "@/validations/category.validation";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (req.method === "POST") {
    if (!token || token.role !== "admin") {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    req.body.id = uuidv4();

    const { validatedData, errors } = createCategoryValidation(req.body);

    if (errors) {
      console.error("ERR: category - create = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await createCategory(validatedData);
      console.info("Create category success");
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Create category success",
      });
    } catch (error) {
      console.error("ERR: category - create = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  } else if (req.method === "PUT") {
    if (!token || token.role !== "admin") {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;

    const { validatedData, errors } = updateCategoryValidation(req.body);

    if (errors) {
      console.error("ERR: category - update = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await updateCategory(id as string, validatedData);
      console.log("update category success");
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Update category success",
      });
    } catch (error) {
      console.error("ERR: category update = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  } else if (req.method === "DELETE") {
    if (!token || token.role !== "admin") {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;

    try {
      await deleteCategory(id as string);
      console.log("Delete category success");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Delete category success",
      });
    } catch (error) {
      console.error("ERR: category - delete = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  } else if (req.method === "GET") {
    if (req.query.id) {
      const { id } = req.query;

      if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid id parameter" });
      }

      try {
        const data = await getCategory(id);
        console.info("Get category success");
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get category success",
          data,
        });
      } catch (error) {
        console.error("ERR: category - get = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    } else {
      try {
        const data = await getCategories();
        console.info("Get categories success");
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get categories success",
          data,
        });
      } catch (error) {
        console.error("ERR: categories - get = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    }
  } else {
    res.status(405).end();
  }
}
