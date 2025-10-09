"use client";

import { useAuthContract } from "@/hooks/contract/use-auth-contract";
import { Button } from "../ui/button";

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
