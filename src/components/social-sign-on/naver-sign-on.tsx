"use client";
import { authClient } from "@/lib/auth";
import { Button } from "../ui/button";

export const NaverSignOn = () => {
  return (
    <Button
      variant="outline"
      onClick={() => {
        authClient.signIn.social({
          provider: "naver",
          callbackURL: "/",
        });
      }}
    >
      Naver로 로그인하기
    </Button>
  );
};
