import { db } from "@server/db";
import { user } from "@server/db/schema";
import { eq } from "drizzle-orm";
import type { DeleteUnverifiedUserJobData } from "../../jobs/user-job.type";

export const processDeleteUnverifiedUser = async (
  data: DeleteUnverifiedUserJobData,
) => {
  const { userId } = data;
  // DB에서 유저 조회
  const targetUser = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: { id: true, emailVerified: true, email: true },
  });

  // 유저가 없으면 이미 삭제됨
  if (!targetUser) {
    console.log(`✓ User ${userId} already deleted`);
    return { deleted: false, reason: "already_deleted" };
  }

  // 이메일 인증 완료됨
  if (targetUser.emailVerified) {
    console.log(`✓ User ${userId} already verified`);
    return { deleted: false, reason: "already_verified" };
  }

  // 아직도 미인증이면 삭제
  await db.delete(user).where(eq(user.id, userId));
  console.log(`✅ Deleted unverified user: ${userId} (${targetUser.email})`);

  return { deleted: true, userId, email: targetUser.email };
};
