import { EMAIL_QUEUE_NAME } from "@workers/queues/email.queue";
import { Worker } from "bullmq";
import { defaultWorkerOptions, getWorker } from "../config";
import { handleVerificationEmailFailure } from "../handlers/email/handle-verification-email-failure";
import { processSendResetPasswordEmail } from "../handlers/email/send-reset-password-email";
import { processSendVerificationEmail } from "../handlers/email/send-verification-email";
import {
  EMAIL_JOB_NAMES,
  type SendResetPasswordEmailJobData,
  type SendVerificationEmailJobData,
} from "../jobs/email-job.type";

export const startEmailWorker = () => {
  const worker = getWorker(
    EMAIL_QUEUE_NAME,
    () =>
      new Worker(
        EMAIL_QUEUE_NAME,
        async (job) => {
          const { name, data } = job;

          switch (name) {
            case EMAIL_JOB_NAMES.SEND_VERIFICATION_EMAIL:
              return processSendVerificationEmail(
                data as SendVerificationEmailJobData,
              );
            case EMAIL_JOB_NAMES.SEND_RESET_PASSWORD_EMAIL:
              return processSendResetPasswordEmail(
                data as SendResetPasswordEmailJobData,
              );
            default:
              throw new Error(`알 수 없는 이메일 작업: ${name}`);
          }
        },
        defaultWorkerOptions,
      ),
  );

  worker.on("completed", (job) => {
    console.log(`[이메일 Worker] 작업 완료: ${job.name} (ID: ${job.id})`);
  });

  worker.on("failed", async (job, err) => {
    console.error(
      `[이메일 Worker] 작업 실패: ${job?.name} (ID: ${job?.id})`,
      err,
    );

    // 재시도 횟수를 확인하여 모든 재시도가 소진되었는지 확인
    if (job && job.attemptsMade >= (job.opts.attempts || 3)) {
      console.warn(
        `[이메일 Worker] 모든 재시도 소진됨: ${job.name} (ID: ${job.id})`,
      );

      switch (job.name) {
        // SendVerificationEmail 작업이 최종 실패한 경우 특정 로직 실행
        case EMAIL_JOB_NAMES.SEND_VERIFICATION_EMAIL:
          await handleVerificationEmailFailure(
            job.data as SendVerificationEmailJobData,
            err,
          );
      }
    }
  });

  worker.on("error", (err) => {
    console.error("[이메일 Worker] Worker 에러:", err);
  });

  worker.on("stalled", (jobId) => {
    console.warn(`[이메일 Worker] 작업 지연됨: ${jobId}`);
  });

  console.log("[이메일 Worker] 시작됨");

  return worker;
};
