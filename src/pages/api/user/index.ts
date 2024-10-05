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
import { checkPassword, hashing } from "@/utils/hashing";

export default async function handlerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (use your domain in production)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
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

    const hashedPassword = hashing(req.body.password);
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
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "PUT") {
    if (!token) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;

    if (token.id !== id) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { validatedData, errors } = updateUserValidation(req.body);

    if (errors) {
      console.error("ERR: user - update = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    if (validatedData.newPassword) {
      const user = await getOneUser(id as string);

      if (!user) {
        console.error("Data not found");
        return res
          .status(404)
          .send({ status: false, statusCode: 404, message: "Data not found" });
      }

      if (user.password && validatedData.currentPassword) {
        const isPasswordMatch = checkPassword(
          validatedData.currentPassword,
          user.password
        );

        if (!isPasswordMatch) {
          return res.status(403).send({
            status: false,
            statusCode: 403,
            message: "Old password is incorrect",
          });
        }
      }

      const hashedPassword = hashing(validatedData.newPassword);
      validatedData.newPassword = hashedPassword;
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
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "DELETE") {
    if (!token) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;

    if (token.id !== id) {
      res.status(403).json({ message: "Forbidden" });
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
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "GET") {
    if (!token) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    if (req.query.id) {
      const { id } = req.query;

      if (token.id !== id) {
        res.status(403).json({ message: "Forbidden" });
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
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      try {
        const { skip, take, search, isSubscribed } = req.query;
        const { totalData, data } = await getAllUsers(
          Number(skip),
          Number(take),
          search as string,
          isSubscribed as any
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
