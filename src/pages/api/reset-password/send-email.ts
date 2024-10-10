import { NextApiRequest, NextApiResponse } from "next";
import { sendPasswordResetEmail } from "@/helpers/emailService";
import { existingUser } from "@/controllers/user.controller";
import { signJWT } from "@/utils/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const email = req.body;

    const user = await existingUser(email);

    if (!user) {
      return res
        .status(400)
        .send({ success: false, successCode: 400, message: "Email not found" });
    }

    const token = signJWT({ userId: user.id }, { expiresIn: "30m" });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password/reset-password?token=${token}`; 
    await sendPasswordResetEmail(user.email, resetUrl);

    res.status(200).send({
      success: true,
      statusCode: 200,
      message: "Email sent successfully!",
    });
  } else {
    res.status(405).send({
      success: false,
      statusCode: 405,
      message: "Method not allowed",
    });
  }
}
