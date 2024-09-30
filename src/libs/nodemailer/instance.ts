import nodemailer from "nodemailer";

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
  html: string;
};

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

const emailInstance = async (data: sendEmailProps) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_SMTP_FROM_EMAIL,
    ...data,
  });
};

export default emailInstance;
