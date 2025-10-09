"use client";

import { authClient } from "@/lib/auth";
import { authContractClient } from "@/lib/contract-client";
import { SetUpAdminUserSchemaType } from "@shared/schema/set-up-admin-user.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAuthContract = () => {
  const getSession = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await authClient.getSession();
      return res.data;
    },
  });

  const signInEmail = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (res.data) {
        return res.data;
      }

      if (res.error.status === 403) {
        throw new Error("이메일 인증을 완료해주세요.");
      }
      if (res.error.status === 400) {
        throw new Error(res.error.message);
      }
      if (res.error.status === 401) {
        throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    },
  });

  const signInSocial = useMutation({
    mutationFn: (provider: "google" | "naver" | "kakao") =>
      authClient.signIn.social({
        provider,
        callbackURL: "/",
      }),
    onSuccess: () => {
      getSession.refetch();
    },
  });

  const signUpEmail = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      name: string;
    }) => {
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/",
      });

      if (res.data) {
        return res.data;
      }

      if (res.error.status === 400) {
        throw new Error(res.error.message);
      }
      if (res.error.status === 422) {
        throw new Error("이미 사용중인 이메일입니다.");
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    },
  });

  const setupAdminUser = useMutation({
    mutationFn: (data: SetUpAdminUserSchemaType) =>
      authContractClient.setupAdminUser({
        body: data,
      }),
  });

  const signOut = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      getSession.refetch();
    },
  });

  const requestPasswordReset = useMutation({
    mutationFn: async (email: string) => {
      const res = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });
      if (res.data) {
        return res.data;
      }
      throw new Error(res.error.message);
    },
  });

  const resetPassword = useMutation({
    mutationFn: async (data: { newPassword: string; token: string }) => {
      const res = await authClient.resetPassword({
        newPassword: data.newPassword,
        token: data.token,
      });
      if (res.data) {
        return res.data;
      }
      throw new Error(res.error.message);
    },
  });

  return {
    getSession,
    setupAdminUser,
    signInSocial,
    signInEmail,
    signUpEmail,
    signOut,
    requestPasswordReset,
    resetPassword,
  };
};
