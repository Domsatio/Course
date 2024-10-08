import {
  getCarts,
  getCartChecked,
  createCart,
  deleteCart,
  updateCart,
  updateIsCheckedAll,
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
      console.error("ERR: cart - create = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      await createCart({ ...validatedData, userId: token.id as string });
      console.info("Create cart success");
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Create cart success",
      });
    } catch (error) {
      console.error("ERR: cart - create = ", error);
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

    const { id, isChecked } = req.body;
    
    if (errors) {
      console.error("ERR: cart - update = ", errors);
      return res
      .status(422)
      .send({ status: false, statusCode: 422, message: errors });
    }

    try {
      const update = id === 'all' ? await updateIsCheckedAll(token.id as string, isChecked as boolean) : 
      await updateCart({...validatedData, userId: token.id as string});
      console.log("update cart success");

      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Update cart success",
      });
    } catch (error) {
      console.error("ERR: cart update = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else if (req.method === "DELETE") {
    if (!token || token.role !== "USER") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { idCart } = req.query;
    const cartId = (idCart as string).replace(/[\[\]]/g, '').split(',')
    const id = token.id as string;
    try {
      await deleteCart(id as string, cartId);
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
      const {checked} = req.query;
      if(checked === 'true'){
        const data = await getCartChecked(token.id as string);
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get cart checked success",
          data,
        });
      }else{
        const { totalData, data } = await getCarts(token.id as string);
        console.info("Get categories success");
  
        return res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Get categories success",
          totalData,
          data,
        });
      }

    } catch (error) {
      console.error("ERR: categories - get = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else {
    res.status(405).end();
  }
}
