// src/config/queue-config.ts
import {
  type ConnectionOptions,
  Queue,
  type QueueOptions,
  type Worker,
  type WorkerOptions,
} from "bullmq";

export const redisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT || 6379),
};

export const defaultJobOptions: QueueOptions["defaultJobOptions"] = {
  // 3번 재시도
  attempts: 3,
  // 1초부터 시작해서 exponential하게 증가
  backoff: {
    type: "exponential" as const,
    delay: 1000,
  },
  // 24시간 후 삭제, 1_000개 이상 삭제
  removeOnComplete: {
    age: 24 * 3600, // 24 hours
    count: 1_000,
  },
  // 7일 후 삭제
  removeOnFail: {
    age: 7 * 24 * 3600, // 7 days
  },
};

export const defaultQueueOptions: QueueOptions = {
  connection: redisConnection,
  defaultJobOptions,
};

export const defaultWorkerOptions: WorkerOptions = {
  connection: redisConnection,
  // 5개 동시 작업
  concurrency: 5,
  limiter: {
    max: 10,
    // 1초 동안 10개 작업
    duration: 1000,
  },
};

export type GlobalWithQueues = typeof globalThis & {
  queues?: Map<string, Queue>;
  workers?: Map<string, Worker>;
};

export const globalWithQueues: GlobalWithQueues =
  globalThis as GlobalWithQueues;

export const getQueue = (name: string) => {
  if (!globalWithQueues.queues) {
    globalWithQueues.queues = new Map();
  }

  if (!globalWithQueues.queues.get(name)) {
    globalWithQueues.queues.set(name, new Queue(name, defaultQueueOptions));
  }

  return globalWithQueues.queues.get(name) as Queue;
};

export const getWorker = (name: string, factory: () => Worker) => {
  if (!globalWithQueues.workers) {
    globalWithQueues.workers = new Map();
  }

  if (!globalWithQueues.workers.get(name)) {
    globalWithQueues.workers.set(name, factory());
  }

  return globalWithQueues.workers.get(name) as Worker;
};

export const closeAllQueues = async () => {
  if (globalWithQueues.queues) {
    const closePromises = Array.from(globalWithQueues.queues.values()).map(
      (queue) => queue.close(),
    );
    await Promise.all(closePromises);
    globalWithQueues.queues.clear();
  }
};

export const closeAllWorkers = async () => {
  if (globalWithQueues.workers) {
    const closePromises = Array.from(globalWithQueues.workers.values()).map(
      (worker) => worker.close(),
    );
    await Promise.all(closePromises);
    globalWithQueues.workers.clear();
  }
};
