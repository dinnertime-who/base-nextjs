export const EMAIL_JOB_NAMES = {
  SEND_VERIFICATION_EMAIL: "send-verification-email",
  SEND_RESET_PASSWORD_EMAIL: "send-reset-password-email",
} as const;

export type SendVerificationEmailJobData = {
  to: string;
  url: string;
  userId: string;
};

export type SendResetPasswordEmailJobData = {
  to: string;
  url: string;
};
