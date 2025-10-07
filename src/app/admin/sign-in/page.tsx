import { SignInForm } from "@/components/form/sign-in.form";

export default function SignInPage() {
  return (
    <section className="grid place-items-center h-screen">
      <article className="w-full max-w-md text-center px-4">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <SignInForm signInType="admin" />
      </article>
    </section>
  );
}
