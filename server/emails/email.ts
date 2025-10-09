// src/lib/email.ts
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import type { ReactElement } from "react";

type SendEmailParams = {
  to: string;
  subject: string;
  template: ReactElement;
};

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendEmail = async ({ to, subject, template }: SendEmailParams) => {
  const transporter = createTransporter();

  const html = await render(template);

  const result = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });

  return result;
};
