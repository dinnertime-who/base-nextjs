"use client";
import { authClient } from "@/lib/auth";
import { Button } from "../ui/button";

export const KakaoSignOn = () => {
  return (
    <Button
      variant="outline"
      onClick={() => {
        authClient.signIn.social({
          provider: "kakao",
          callbackURL: "/",
        });
      }}
    >
      Kakao로 로그인하기
    </Button>
  );
};
