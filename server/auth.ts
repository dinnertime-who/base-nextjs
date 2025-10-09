import { db } from "@server/db";
import * as schema from "@server/db/schema";
import { user } from "@server/db/schema";
import { VERIFICATION_EXPIRES_IN } from "@shared/constants/auth";
import { tryCatch } from "@shared/try-catch";
import * as bcrypt from "bcrypt-ts";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { addDeleteUnverifiedUser } from "../workers/queues/user.queue";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "./service/email/email.service";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema },
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    password: {
      hash(password) {
        return bcrypt.hash(password, 10);
      },
      verify({ password, hash }) {
        return bcrypt.compare(password, hash);
      },
    },
    sendResetPassword: async ({ user: emailUser, url }, _request) => {
      const { error } = await tryCatch(async () => {
        await sendResetPasswordEmail({ to: emailUser.email, url });
      });
      if (error) {
        // TODO: 메일 발송 에러 로깅 추가
        throw new Error("메일 발송 도중 문제가 발생했습니다.");
      }
    },
  },
  emailVerification: {
    enabled: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: VERIFICATION_EXPIRES_IN,
    sendVerificationEmail: async ({ user: emailUser, url }, _request) => {
      const { error } = await tryCatch(async () => {
        await sendVerificationEmail({ to: emailUser.email, url });
      });

      if (error) {
        await db.delete(user).where(eq(user.id, emailUser.id));
        // TODO: 메일 발송 에러 로깅 추가
        throw new Error("메일 발송 도중 문제가 발생했습니다.");
      }

      // BullMQ로 삭제 작업 예약 (정확히 VERIFICATION_EXPIRES_IN 후 실행)
      await addDeleteUnverifiedUser({
        userId: emailUser.id,
        expiresIn: VERIFICATION_EXPIRES_IN,
      });
    },
  },
  account: {
    accountLinking: {
      allowDifferentEmails: true,
      trustedProviders: ["naver", "google", "kakao"],
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      async mapProfileToUser(profile) {
        return {
          ...profile,
          email: `${profile.sub}@google.com`,
          emailVerified: true,
          email_verified: true,
        };
      },
    },
    naver: {
      clientId: process.env.NAVER_CLIENT_ID ?? "",
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
      async mapProfileToUser(profile) {
        return {
          ...profile,
          email: `${profile.response.id}@naver.com`,
          emailVerified: true,
          email_verified: true,
        };
      },
    },
    kakao: {
      clientId: process.env.KAKAO_CLIENT_ID ?? "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
      async mapProfileToUser(profile) {
        return {
          ...profile,
          email: `${profile.id}@kakao.com`,
          emailVerified: true,
          email_verified: true,
        };
      },
    },
  },
  user: {
    additionalFields: {
      role: { type: "string", input: true, required: false },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 1, // 1 day
    updateAge: 60 * 60 * 12, // 12 hours
    freshAge: 60 * 60 * 1, // 1 hour
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  plugins: [nextCookies(), admin()],
});
