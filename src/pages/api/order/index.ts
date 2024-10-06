import {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getOrderByUserId,
} from "@/controllers/order.controller";
// import {
//   createOrderValidation,
//   updateOrderValidation,
// } from "@/validations/order.validation";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { v4 as uuidv4 } from "uuid";

export default async function handlerOrder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  // if (req.method === "POST") {
  //   if (!token) {
  //     res.status(403).json({ message: "Forbidden" });
  //     return;
  //   }

  //   req.body.id = uuidv4();

  //   const { validatedData, errors } = createOrderValidation(req.body);

  //   if (errors) {
  //     console.error("ERR: order - create = ", errors);
  //     return res
  //       .status(422)
  //       .send({ status: false, statusCode: 422, message: errors });
  //   }

  //   try {
  //     await createOrder(validatedData);
  //     console.info("Create order success");
  //     return res.status(201).send({
  //       status: true,
  //       statusCode: 201,
  //       message: "Create order success",
  //     });
  //   } catch (error) {
  //     console.error("ERR: order - create = ", error);
  //     return res
  //       .status(500)
  //       .send({ status: false, statusCode: 500, message: error });
  //   }
  // }
  //  else if (req.method === "PUT") {
  //   if (!token) {
  //     res.status(403).json({ message: "Forbidden" });
  //     return;
  //   }

  //   const { id } = req.query;

  //   const { validatedData, errors } = updateOrderValidation(req.body);

  //   if (errors) {
  //     console.error("ERR: order - update = ", errors);
  //     return res
  //       .status(422)
  //       .send({ status: false, statusCode: 422, message: errors });
  //   }

  //   try {
  //     await updateOrder(id as string, validatedData);
  //     console.info("Update order success");
  //     return res.status(200).send({
  //       status: true,
  //       statusCode: 200,
  //       message: "Update order success",
  //     });
  //   } catch (error) {
  //     console.error("ERR: order - update = ", error);
  //     return res
  //       .status(500)
  //       .send({ status: false, statusCode: 500, message: error });
  //   }
  // }
  // else
  if (req.method === "DELETE") {
    if (!token) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;

    try {
      await deleteOrder(id as string);
      console.info("Delete order success");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Delete order success",
      });
    } catch (error) {
      console.error("ERR: order - delete = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "GET") {
    if (req.query.id) {
      const { id } = req.query;

      try {
        const data = await getOrder(id as string);
        console.info("Get order success");
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get order success",
          data,
        });
      } catch (error) {
        console.error("ERR: order - get = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    } else {
      try {
        if (req.query.userId) {
          const { userId } = req.query;
          const data = await getOrderByUserId(userId as string);
          console.info("Get orders success");
          return res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Get orders success",
            data,
          });
        } else {
          const { skip, take } = req.query;
          const { totalData, data } = await getOrders(
            Number(skip),
            Number(take)
          );
          console.info("Get orders success");
          return res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Get orders success",
            totalData,
            data,
          });
        }
      } catch (error) {
        console.error("ERR: orders - get = ", error);
        return res
          .status(422)
          .send({ status: false, statusCode: 422, message: error });
      }
    }
  } else {
    res.status(405).end();
  }
}
