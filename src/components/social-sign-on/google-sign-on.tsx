"use client";

import { authClient } from "@/lib/auth";
import { Button } from "../ui/button";

export const GoogleSignOn = () => {
  return (
    <Button
      variant="outline"
      onClick={() => {
        authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });
      }}
    >
      Google로 로그인하기
    </Button>
  );
};
