import { getQueue } from "../config";
import {
  type DeleteUnverifiedUserJobData,
  USER_JOB_NAMES,
} from "../jobs/user-job.type";

export const USER_QUEUE_NAME = "user";

export const userQueue = getQueue(USER_QUEUE_NAME);

// Job 추가 헬퍼 함수들
export const addDeleteUnverifiedUser = (data: DeleteUnverifiedUserJobData) =>
  userQueue.add(USER_JOB_NAMES.DELETE_UNVERIFIED_USER, data, {
    delay: data.expiresIn * 1000,
    jobId: `${USER_JOB_NAMES.DELETE_UNVERIFIED_USER}-${data.userId}`, // 중복 방지
  });
