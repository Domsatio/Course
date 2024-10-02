import {
  getTemporaryCart,
  createTemporaryCart,
  deleteTemporaryCart,
  updateQuantityTemporaryCart,
} from "@/controllers/cart.controller";
import {
  createCartValidation,
  updateCartValidation,
} from "@/validations/cart.validation";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "next-auth/jwt";

export default async function handlerCart(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (req.method === "POST") {
    if (!token || token.role !== "USER") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    req.body.id = uuidv4();

    const { validatedData, errors } = createCartValidation(req.body);
    
    if (errors) {
      console.error("ERR: temporary cart - create = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await createTemporaryCart({
        ...validatedData,
        userId: token.id as string,
      });
      console.info("Create remporary cart success");
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Create temporary cart success",
      });
    } catch (error) {
      console.error("ERR: temporary cart - create = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "PUT") {
    if (!token || token.role !== "USER") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { validatedData, errors } = updateCartValidation(req.body);

    if (errors) {
      console.error("ERR: temporary cart - update = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await updateQuantityTemporaryCart({
        ...validatedData,
        userId: token.id as string,
      });

      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Update temporary cart success",
      });
    } catch (error) {
      console.error("ERR: temporary cart update = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "DELETE") {
    if (!token || token.role !== "USER") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const id = token.id as string;
    try {
      await deleteTemporaryCart(id as string);
      console.log("Delete cart success");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Delete cart success",
      });
    } catch (error) {
      console.error("ERR: cart - delete = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "GET") {
    try {
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { idProduct } = req.query;

      const data = await getTemporaryCart(
        token.id as string,
        idProduct as string
      );
      console.info("Get temporary cart success");

      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Get temporary cart success",
        data,
      });
    } catch (error) {
      console.error("ERR: temporary cart - get = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else {
    res.status(405).end();
  }
}
