"use client";

import { Button } from "../ui/button";
import { useAuthContract } from "@/hooks/contract/use-auth-contract";

export const GoogleSignOn = () => {
  const { signInSocial } = useAuthContract();
  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={() => signInSocial.mutateAsync("google")}
    >
      Google로 로그인하기
    </Button>
  );
};
