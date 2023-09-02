import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.SMTP_HOST || "mail.g1garlic.pk",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "notification@g1garlic.pk",
    pass: process.env.SMTP_PASSWORD || "Imranmalik123##",
  },
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  let from = `G1 Garlic Trade <${process.env.SMTP_FROM_EMAIL}>`;
  return await transporter.sendMail({
    // from: process.env.SMTP_FROM_EMAIL,
    from: from,
    bcc: "nextebiz.com@gmail.com",
    ...data,
  });
};
