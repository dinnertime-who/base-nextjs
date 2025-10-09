import { Queue } from "bullmq";

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
};

export const userVerificationQueue = new Queue("user-verification", {
  connection,
  defaultJobOptions: {
    attempts: 3, // 실패 시 3번 재시도
    backoff: {
      type: "exponential",
      delay: 1000, // 1초부터 시작해서 exponential하게 증가
    },
    removeOnComplete: true, // 완료된 작업 자동 삭제 (메모리 절약)
    removeOnFail: false, // 실패한 작업은 보관 (디버깅용)
  },
});

// 큐 타입 정의
export type DeleteUnverifiedUserJob = {
  userId: string;
};
