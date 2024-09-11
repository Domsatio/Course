import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from "@/controllers/product.controller";
import {
  createProductValidation,
  updateProductValidation,
} from "@/validations/product.validation";
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

    const { validatedData, errors } = createProductValidation(req.body);

    if (errors) {
      console.error("ERR: product - create = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await createProduct(validatedData);
      console.info("Create product success");
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Create product success",
      });
    } catch (error) {
      console.error("ERR: product - create = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  } else if (req.method === "GET") {
    if (req.query.id) {
      const { id } = req.query;

      try {
        const data = await getProduct(id as string);
        console.info("Get product success");
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get product success",
          data,
        });
      } catch (error) {
        console.error("ERR: product - get one = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    } else {
      try {
        const { skip, take } = req.query;
        const { totalData, data } = await getProducts(
          Number(skip),
          Number(take)
        );
        console.info("Get all products success");
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get all products success",
          totalData,
          data,
        });
      } catch (error) {
        console.error("ERR: product - get all = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    }
  } else if (req.method === "PUT") {
    if (!token || token.role !== "ADMIN") {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;

    const { validatedData, errors } = updateProductValidation(req.body);

    if (errors) {
      console.error("ERR: product - update = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await updateProduct(id as string, validatedData);
      console.info("Update product success");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Update product success",
      });
    } catch (error) {
      console.error("ERR: product - update = ", error);
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
      await deleteProduct(id as string);
      console.info("Delete product success");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Delete product success",
      });
    } catch (error) {
      console.error("ERR: product - delete = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  }
}
