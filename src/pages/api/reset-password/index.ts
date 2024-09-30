import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@/utils/jwt";
import { updateUser } from "@/controllers/user.controller";
import { hashing } from "@/utils/hasing";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.query;

    const { decoded } = verifyJWT(token as string);

    if (!decoded) {
      res.status(400).send({
        success: false,
        successCode: 400,
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = hashing(req.body as string);

    try {
      await updateUser(decoded.userId, { newPassword: hashedPassword });

      res.status(200).send({
        success: true,
        successCode: 200,
        message: "Password has been resetted!",
      });
    } catch (error) {
      console.error("ERR: user - update = ", error);
      return res
        .status(500)
        .send({ status: false, statusCode: 500, message: error });
    }
  } else {
    res.status(405).send({
      success: false,
      successCode: 405,
      message: "Method not allowed",
    });
  }
}
