import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@server/db";
import * as schema from "@server/db/schema";
import { emailOTP, admin, organization, jwt, role } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import * as bcrypt from "bcrypt-ts";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema },
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash(password) {
        return bcrypt.hash(password, 10);
      },
      verify({ password, hash }) {
        return bcrypt.compare(password, hash);
      },
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
      role: { type: "string", input: true },
    },
  },
  plugins: [
    nextCookies(),
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        console.log(`Sending verification OTP to ${email}: ${otp}`);
      },
    }),
    admin(),
    organization(),
    jwt(),
  ],
});
