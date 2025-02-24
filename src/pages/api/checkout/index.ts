import { NextApiRequest, NextApiResponse } from "next";
import { createCheckoutValidation } from "@/validations/checkout.validation";
import {
  createTransaction,
  createTransactionBuyDirectly,
  cancelTransaction
} from "@/controllers/midtrans.controller";
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

    const { BD } = req.query;
    let transactionResult: any | false;

    if (BD === "true") {
      transactionResult = await createTransactionBuyDirectly(
        token.id as string
      );
    } else if (BD === "false") {
      transactionResult = await createTransaction(token.id as string);
    } else {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Bad request",
      });
      return;
    }

    if (!transactionResult) {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Transaction creation failed",
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
      },
    });
  } else if (req.method === 'DELETE') {
    if (!token || token.role !== "USER") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { id } = req.query;
    
    const cencel_transaction = await cancelTransaction(id as string);
    if(cencel_transaction){
      res.status(200).send({
        success: true,
        statusCode: 200,
        message: "Order cencelled successfully!",
      });
    }else{
      res.status(500).send({
        success: false,
        statusCode: 500,
        message: "Failed to cencel order!",
      });
    }
  }
  else {
    res.status(405).send({
      success: false,
      statusCode: 405,
      message: "Method not allowed",
    });
  }
}
