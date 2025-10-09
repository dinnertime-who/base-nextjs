import { db } from "@server/db";
import { user } from "@server/db/schema";
import type { DeleteUnverifiedUserJob } from "@server/queues/user-verification.queue";
import { Worker } from "bullmq";
import { eq } from "drizzle-orm";

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
};

let workerInstance: Worker | null = null;

export function startWorkers() {
  // 이미 시작된 경우 중복 실행 방지
  if (workerInstance) {
    console.log("⚠️  Workers already running");
    return workerInstance;
  }

  // User verification worker
  workerInstance = new Worker<DeleteUnverifiedUserJob>(
    "user-verification",
    async (job) => {
      const { userId } = job.data;

      console.log(`🔍 Checking user verification status: ${userId}`);

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
      console.log(
        `✅ Deleted unverified user: ${userId} (${targetUser.email})`,
      );

      return { deleted: true, userId, email: targetUser.email };
    },
    {
      connection,
      concurrency: 5, // 동시에 5개 작업 처리
    },
  );

  // Worker 이벤트 핸들러
  workerInstance.on("completed", (job, result) => {
    console.log(`✓ Job ${job.id} completed:`, result);
  });

  workerInstance.on("failed", (job, err) => {
    console.error(`✗ Job ${job?.id} failed:`, err.message);
  });

  workerInstance.on("error", (err) => {
    console.error("❌ Worker error:", err);
  });

  console.log("🚀 BullMQ workers started");

  return workerInstance;
}

// Graceful shutdown
export async function stopWorkers() {
  if (workerInstance) {
    console.log("🛑 Stopping workers...");
    await workerInstance.close();
    workerInstance = null;
    console.log("✓ Workers stopped");
  }
}

// Process termination handlers
process.on("SIGTERM", async () => {
  await stopWorkers();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await stopWorkers();
  process.exit(0);
});
