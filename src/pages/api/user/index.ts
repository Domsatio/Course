import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createUser,
  updateUser,
  deleteUser,
  getOneUser,
  getAllUsers,
  existingUser,
} from "@/controllers/user.controller";
import {
  createUserValidation,
  updateUserValidation,
} from "@/validations/user.validation";
import { getToken } from "next-auth/jwt";
import { v4 as uuidv4 } from "uuid";

export default async function handlerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (req.method === "POST") {
    const isUserExist = await existingUser(req.body.email);

    if (isUserExist) {
      console.error("User already exists");
      return res.status(409).send({
        status: false,
        statusCode: 409,
        message: "User already exists",
      });
    }

    req.body.id = uuidv4();

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const { validatedData, errors } = createUserValidation(req.body);

    if (errors) {
      console.error("ERR: user - create = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await createUser(validatedData);
      console.info("Create user success");
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Create user success",
      });
    } catch (error) {
      console.error("ERR: user - create = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  } else if (req.method === "PUT") {
    if (!token) {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;

    if (token.id !== id) {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    const { validatedData, errors } = updateUserValidation(req.body);

    if (errors) {
      console.error("ERR: user - update = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      const result = await updateUser(id as string, validatedData);

      if (result) {
        console.log("update user success");
        return res.status(201).send({
          status: true,
          statusCode: 201,
          message: "Update user success",
        });
      } else {
        console.log("Data not found");
        return res
          .status(404)
          .send({ status: false, statusCode: 404, message: "Data not found" });
      }
    } catch (error) {
      console.error("ERR: user - update = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  } else if (req.method === "DELETE") {
    if (!token) {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;

    if (token.id !== id) {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    try {
      const result = await deleteUser(id as string);

      if (result) {
        console.log("Delete user success");
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Delete user success",
        });
      } else {
        console.log("Data not found");
        return res
          .status(404)
          .send({ status: false, statusCode: 404, message: "Data not found" });
      }
    } catch (error) {
      console.error("ERR: user - delete = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  } else if (req.method === "GET") {
    if (!token) {
      res.status(401).json({ message: "Forbidden" });
      return;
    }

    if (req.query.id) {
      const { id } = req.query;

      if (token.id !== id) {
        res.status(401).json({ message: "Forbidden" });
        return;
      }

      if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid id parameter" });
      }

      try {
        const data = await getOneUser(id);
        console.info("Get one user success");
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get one user success",
          data,
        });
      } catch (error) {
        console.error("ERR: user - get one = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    } else {
      if (token.role !== "ADMIN") {
        res.status(401).json({ message: "Forbidden" });
        return;
      }

      try {
        const { skip, take } = req.query;
        const { totalData, data } = await getAllUsers(
          Number(skip),
          Number(take)
        );
        console.info("Get all users success");
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get all users success",
          totalData,
          data,
        });
      } catch (error) {
        console.error("ERR: user - get all = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    }
  } else {
    res.status(405).end();
  }
}
