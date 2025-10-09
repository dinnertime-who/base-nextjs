import { db } from "@server/db";
import { user } from "@server/db/schema";
import { eq } from "drizzle-orm";
import type { SendVerificationEmailJobData } from "../../jobs/email-job.type";

export const handleVerificationEmailFailure = async (
  data: SendVerificationEmailJobData,
  error: Error,
) => {
  console.error(
    `[이메일 Worker] 인증 이메일 발송 최종 실패 - 재시도 모두 소진: ${data.to}`,
    error,
  );

  // 사용자 계정 삭제
  await db.delete(user).where(eq(user.id, data.userId));
};
