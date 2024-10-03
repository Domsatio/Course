import { NextApiRequest, NextApiResponse } from "next";
import { createCheckoutValidation } from "@/validations/checkout.validation";
import { createTransaction } from "@/controllers/mitrans.controller";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (req.method === "POST") {
    if (!token || token.role !== "USER") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const transactionResult = await createTransaction(token.id as string);

    if (!transactionResult) {
      res.status(500).json({ 
        success: false, 
        statusCode: 500,
        message: "Transaction creation failed"
      });
      return;
    }

    const { orderData, transactionToken } = transactionResult;

    res.status(200).send({
      success: true,
      statusCode: 200,
      message: "Order created successfully!",
      data: {
        token: transactionToken,
        orderData: orderData,
      }
    });
  } else {
    res.status(405).send({
      success: false,
      statusCode: 405,
      message: "Method not allowed",
    });
  }
}
