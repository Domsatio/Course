import { NextApiRequest, NextApiResponse } from "next";
import { createSubscription } from "@/controllers/midtrans.controller";
import { createSubscriptionValidation } from "@/validations/subsctiption.validation";
import { getToken } from "next-auth/jwt";
import { Subscription } from "@/types/subscription.type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (!token || token.role !== "USER") {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const { validatedData, errors } = createSubscriptionValidation(req.body);
  if (errors) {
    console.error("ERR: subscription - create = ", errors);
    return res
      .status(422)
      .send({ status: false, statusCode: 422, message: errors });
  }

  const id = token.id as string;
  if (req.method === "POST") {
    const { plan, paymentMethod, payload } = validatedData as Subscription;
    const create_subscription = await createSubscription(
      id,
      plan,
      paymentMethod,
      payload
    );

    if (create_subscription) {
      return res.status(201).send({
        success: true,
        statusCode: 201,
        message: "Subscription created successfully",
        data: create_subscription,
      });
    } else {
      return res.status(500).send({
        success: false,
        statusCode: 500,
        message: "Subscription creation failed",
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
