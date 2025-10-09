import { sendResetPasswordEmail } from "@server/service/email/email.service";
import type { SendResetPasswordEmailJobData } from "../../jobs/email-job.type";

export const processSendResetPasswordEmail = async (
  data: SendResetPasswordEmailJobData,
) => {
  console.log(
    `[이메일 Worker] 비밀번호 재설정 이메일 발송 시작: ${data.to}, URL: ${data.url}`,
  );

  await sendResetPasswordEmail({
    to: data.to,
    url: data.url,
  });

  console.log(`[이메일 Worker] 비밀번호 재설정 이메일 발송 완료: ${data.to}`);
};
