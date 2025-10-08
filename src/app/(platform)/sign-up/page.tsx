import { SignUpForm } from "@/components/form/sign-up.form";

export default async function SignUpPage() {
  return (
    <section className="grid place-items-center h-screen">
      <article className="w-full max-w-md text-center px-4">
        <h1 className="text-2xl font-bold mb-4">회원가입</h1>
        <SignUpForm />
      </article>
    </section>
  );
}
