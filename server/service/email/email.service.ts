// src/lib/email.ts
import { render } from "@react-email/components";
import { VerificationEmail } from "@server/emails/templates/verification-email";
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

const sendEmail = async ({ to, subject, template }: SendEmailParams) => {
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

export const sendVerificationEmail = async ({
  to,
  url,
}: {
  to: string;
  url: string;
}) => {
  return sendEmail({
    to,
    subject: `[${process.env.NEXT_PUBLIC_APP_NAME}] 회원가입을 완료해주세요.`,
    template: VerificationEmail({ verificationUrl: url }),
  });
};
