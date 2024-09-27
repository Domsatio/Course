import { render } from "@react-email/render";
import { EmailAdmin } from "@/components/FormatEmail";
const nodemailer = require("nodemailer");
import { NextApiRequest, NextApiResponse } from "next";
import { createEmailValidation } from "@/validations/email.validation";

type smtpOptionsProps = {
  service: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
};

type sendEmailProps = {
  to: string;
  subject: string;
  html: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { validatedData, errors } = createEmailValidation(req.body);

  if (errors) {
    console.error("ERR: order - create = ", errors);
    return res
      .status(422)
      .send({ status: false, statusCode: 422, message: errors });
  }

  const { name, email, message } = validatedData;
  await sendEmail({
    to: "domsattech@gmail.com",
    subject: "New Message to Domsat Tech",
    html: await render(EmailAdmin({ name, email, message })),
  });

  return res.status(200).json({ message: "Email sent successfully" });
}

// Replace with your SMTP credentials
const smtpOptions: smtpOptionsProps = {
  service: "gmail",
  host: process.env.NEXT_PUBLIC_SMTP_HOST || "",
  port: parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER || "",
    pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD || "",
  },
};

export const sendEmail = async (data: sendEmailProps) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_SMTP_FROM_EMAIL,
    ...data,
  });
};
