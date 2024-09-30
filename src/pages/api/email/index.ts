import { NextApiRequest, NextApiResponse } from "next";
import { createEmailValidation } from "@/validations/email.validation";
import { sendContactUsEmail } from "@/helpers/emailService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { validatedData, errors } = createEmailValidation(req.body);

    if (errors) {
      console.error("ERR: email - send = ", errors);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: errors });
    }

    await sendContactUsEmail(validatedData);

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
