import { getOneAddress, upsertAddress } from "@/controllers/address.controller";
import { updateAddressValidation } from "@/validations/address.validation";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (req.method === "PUT") {
    if (!token) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    req.body.id = uuidv4();
    const { userId } = req.query;

    if (token.id !== userId && !token) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { validatedData, errors } = updateAddressValidation(req.body);

    if (errors) {
      console.error("ERR: address - update = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }
    const id = userId || token.id;
    try {
      await upsertAddress(id as string, validatedData);
      console.log("update address success");
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Update address success",
      });
    } catch (error) {
      console.error("ERR: address update = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "GET") {
    if (!token) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { userId } = req.query;
    console.log(token.id);
    

    if (token.id !== userId && !token.id) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const id = userId || token.id;
    try {
      const data = await getOneAddress((id as string));
      console.info("Get address success");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Get address success",
        data,
      });
    } catch (error) {
      console.error("ERR: address - get = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else {
    res.status(405).end();
  }
}
