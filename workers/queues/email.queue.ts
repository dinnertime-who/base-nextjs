import { getQueue } from "../config";
import {
  EMAIL_JOB_NAMES,
  type SendResetPasswordEmailJobData,
  type SendVerificationEmailJobData,
} from "../jobs/email-job.type";

export const EMAIL_QUEUE_NAME = "email";

const emailQueue = getQueue(EMAIL_QUEUE_NAME);

export const addSendVerificationEmail = (data: SendVerificationEmailJobData) =>
  emailQueue.add(EMAIL_JOB_NAMES.SEND_VERIFICATION_EMAIL, data, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  });

export const addSendResetPasswordEmail = (
  data: SendResetPasswordEmailJobData,
) =>
  emailQueue.add(EMAIL_JOB_NAMES.SEND_RESET_PASSWORD_EMAIL, data, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  });
