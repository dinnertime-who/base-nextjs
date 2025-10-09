import { Worker } from "bullmq";
import { defaultWorkerOptions, getWorker } from "../config";
import { processDeleteUnverifiedUser } from "../handlers/user/delete-unverified-user";
import {
  type DeleteUnverifiedUserJobData,
  USER_JOB_NAMES,
} from "../jobs/user-job.type";
import { USER_QUEUE_NAME } from "../queues/user.queue";

export function startUserWorker() {
  return getWorker(USER_QUEUE_NAME, () => {
    const worker = new Worker(
      USER_QUEUE_NAME,
      async (job) => {
        const { name, data } = job;

        console.log(`Processing job: ${name} [${job.id}]`);

        switch (name) {
          case USER_JOB_NAMES.DELETE_UNVERIFIED_USER:
            return processDeleteUnverifiedUser(
              data as DeleteUnverifiedUserJobData,
            );

          default:
            throw new Error(`Unknown job name: ${name}`);
        }
      },
      defaultWorkerOptions,
    );

    // 이벤트 핸들러 등록
    worker.on("completed", (job) => {
      console.log(`✓ Job ${job.id} completed successfully`);
    });

    worker.on("failed", (job, err) => {
      console.error(`✗ Job ${job?.id} failed:`, err.message);
    });

    worker.on("error", (err) => {
      console.error("Worker error:", err);
    });

    worker.on("stalled", (jobId) => {
      console.warn(`Job ${jobId} stalled`);
    });

    return worker;
  });
}
