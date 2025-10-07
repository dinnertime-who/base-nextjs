import { SetUpAdminUserForm } from "@/components/form/set-up-admin-user.form";

export default function SetupPage() {
  return (
    <section className="grid place-items-center h-screen">
      <article className="w-full max-w-md text-center px-4">
        <h1 className="text-2xl font-bold mb-4">관리자 설정</h1>
        <SetUpAdminUserForm />
      </article>
    </section>
  );
}
