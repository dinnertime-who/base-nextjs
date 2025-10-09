import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@server/db";
import * as schema from "@server/db/schema";
import { admin, createAuthMiddleware, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import * as bcrypt from "bcrypt-ts";
import { user } from "@server/db/schema";
import { and, eq } from "drizzle-orm";
import { VERIFICATION_EXPIRES_IN } from "@shared/constants/auth";
import { sendVerificationEmail } from "./service/email/email.service";
import { tryCatch } from "@shared/try-catch";

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
  },
  emailVerification: {
    enabled: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: VERIFICATION_EXPIRES_IN,
    sendVerificationEmail: async ({ user: emailUser, url }, request) => {
      const { error } = await tryCatch(async () => {
        await sendVerificationEmail({ to: emailUser.email, url });
      });

      if (error) {
        console.error(error);
      }

      setTimeout(async () => {
        const targetUser = await db.query.user.findFirst({
          columns: { emailVerified: true },
          where: eq(user.id, emailUser.id),
        });

        if (targetUser) {
          await db.delete(user).where(eq(user.id, emailUser.id));
        }
      }, VERIFICATION_EXPIRES_IN * 1000);
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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    naver: {
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    },
    kakao: {
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
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
  plugins: [nextCookies(), admin(), organization()],
});
