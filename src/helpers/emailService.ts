import emailInstance from "@/libs/nodemailer/instance";
import { render } from "@react-email/render";
import { EmailAdmin } from "@/components/FormatEmail";
import { Email } from "@/types/email.type";

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  await emailInstance({
    to: email,
    subject: "Reset Password",
    html: `<p>Click <a href=${resetUrl}>here</a> to reset your password. The link is valid for 30 minutes.</p>`,
  });
};

export const sendContactUsEmail = async ({ name, email, message }: Email) => {
  await emailInstance({
    to: "domsattech@gmail.com",
    subject: `New message from ${name}`,
    html: await render(EmailAdmin({ name, email, message })),
  });
};
