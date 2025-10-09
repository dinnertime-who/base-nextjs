import { RequestResetPasswordForm } from "@/components/form/request-reset-password.form";
import { ResetPasswordForm } from "@/components/form/reset-password.form";

export default async function ResetPasswordPage(
  props: PageProps<"/reset-password">
) {
  const searchParams = await props.searchParams;
  const { token, error } = searchParams;

  return (
    <section className="grid place-items-center h-screen">
      <article className="w-full max-w-md text-center px-4">
        <h1 className="text-2xl font-bold mb-4">비밀번호 재설정</h1>
        {token && !error && <ResetPasswordForm token={token as string} />}
        {!token && !error && <RequestResetPasswordForm />}
        {error && <div>URL이 만료되었습니다.</div>}
      </article>
    </section>
  );
}
