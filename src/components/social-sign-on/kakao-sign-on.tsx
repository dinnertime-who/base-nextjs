"use client";
import { Button } from "../ui/button";
import { useAuthContract } from "@/hooks/contract/use-auth-contract";

export const KakaoSignOn = () => {
  const { signInSocial } = useAuthContract();
  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={() => signInSocial.mutateAsync("kakao")}
    >
      Kakao로 로그인하기
    </Button>
  );
};
