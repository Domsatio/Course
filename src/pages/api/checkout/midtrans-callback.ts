import { NextApiRequest, NextApiResponse } from "next";
import { createCheckoutValidation } from "@/validations/checkout.validation";
import { updateOrder } from "@/controllers/order.controller";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body, "req.bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
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
  } else {
    res.status(405).send({
      success: false,
      statusCode: 405,
      message: "Method not allowed",
    });
  }
}
