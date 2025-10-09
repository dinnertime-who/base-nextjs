import { sendVerificationEmail } from "@server/service/email/email.service";
import type { SendVerificationEmailJobData } from "../../jobs/email-job.type";

export const processSendVerificationEmail = async (
  data: SendVerificationEmailJobData,
) => {
  console.log(
    `[이메일 Worker] 인증 이메일 발송 시작: ${data.to}, URL: ${data.url}`,
  );

  await sendVerificationEmail({
    to: data.to,
    url: data.url,
  });

  console.log(`[이메일 Worker] 인증 이메일 발송 완료: ${data.to}`);
};
