import { NextApiRequest, NextApiResponse } from "next";
import { createCheckoutValidation } from "@/validations/checkout.validation";
import { deleteOrder, updateOrder } from "@/controllers/order.controller";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (use your domain in production)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const transaction_status = req.body.transaction_status;
  if (req.method === "POST") {
    if (transaction_status === "expire" || transaction_status === "cancel") {
      await deleteOrder(req.body.order_id);
      res.status(200).send({
        success: true,
        statusCode: 200,
        message: "Order removed!",
      });
    } else {
      await updateOrder({
        id: req.body.order_id,
        transactionStatus: req.body.transaction_status,
        transactionTime: req.body.transaction_time,
        settlementTime: req.body.settlement_time,
      });

      res.status(200).send({
        success: true,
        statusCode: 200,
        message: "Notification send successfully!",
      });
    }
  } else {
    res.status(405).send({
      success: false,
      statusCode: 405,
      message: "Method not allowed",
    });
  }
}
