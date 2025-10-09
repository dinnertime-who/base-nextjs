import { SignInForm } from "@/components/form/sign-in.form";
import { GoogleSignOn } from "@/components/social-sign-on/google-sign-on";
import { KakaoSignOn } from "@/components/social-sign-on/kakao-sign-on";
import { NaverSignOn } from "@/components/social-sign-on/naver-sign-on";
import { Separator } from "@/components/ui/separator";

export default async function SignInPage() {
  return (
    <section className="grid place-items-center h-screen">
      <article className="w-full max-w-md text-center px-4">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <SignInForm signInType="platform" />

        <div className="grid grid-cols-[1fr_max-content_1fr] items-center gap-2 my-4">
          <Separator />
          <span className="text-sm text-muted-foreground">또는</span>
          <Separator />
        </div>

        <div className="grid gap-2">
          <GoogleSignOn />
          <NaverSignOn />
          <KakaoSignOn />
        </div>
      </article>
    </section>
  );
}
