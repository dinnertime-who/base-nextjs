export const USER_JOB_NAMES = {
  DELETE_UNVERIFIED_USER: "delete-unverified-user",
} as const;

export type UserJobName = (typeof USER_JOB_NAMES)[keyof typeof USER_JOB_NAMES];

export type DeleteUnverifiedUserJobData = {
  userId: string;
  expiresIn: number;
};

export type UserJobData = {
  [USER_JOB_NAMES.DELETE_UNVERIFIED_USER]: DeleteUnverifiedUserJobData;
};
