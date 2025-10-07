import { SignInForm } from "@/components/form/sign-in.form";
import { getHasSetup } from "@server/service/auth/setup.service";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const hasSetup = await getHasSetup();
  if (!hasSetup) {
    return redirect("/admin/setup");
  }

  return (
    <section className="grid place-items-center h-screen">
      <article className="w-full max-w-md text-center px-4">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <SignInForm signInType="admin" />
      </article>
    </section>
  );
}
