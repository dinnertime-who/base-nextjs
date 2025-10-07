"use client";

import { useAppForm } from "./core/app-form";
import { cn, wait } from "@/lib/utils";
import { authContract } from "@shared/contract/auth/contract";
import { SetUpAdminUserSchema } from "@shared/schema/set-up-admin-user.schema";
import { initClient } from "@ts-rest/core";
import { useRouter } from "next/navigation";

const client = initClient(authContract, {
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
});

export const SetUpAdminUserForm = ({ className }: { className?: string }) => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: { email: "", password: "", name: "" },
    validators: {
      onChange: SetUpAdminUserSchema,
    },
    onSubmit: async ({ value, meta }) => {
      await wait(1000);

      const res = await client.setupAdminUser({
        body: value,
      });

      if (res.status === 200) {
        alert("설정이 완료되었습니다.");
        router.push("/admin/sign-in");
        return;
      }

      if (res.status === 400 || res.status === 409) {
        alert(res.body.error);
      }

      alert("알 수 없는 오류가 발생했습니다.");
    },
  });

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <form.AppForm>
        <form.Fieldset>
          <form.AppField
            name="name"
            children={(field) => (
              <field.TextField placeholder="이름을 입력해주세요." />
            )}
          ></form.AppField>

          <form.AppField
            name="email"
            children={(field) => (
              <field.TextField placeholder="이메일을 입력해주세요." />
            )}
          ></form.AppField>

          <form.AppField
            name="password"
            children={(field) => (
              <field.PasswordField placeholder="비밀번호를 입력해주세요." />
            )}
          ></form.AppField>
        </form.Fieldset>

        <form.SubmitButton>완료</form.SubmitButton>
      </form.AppForm>
    </form>
  );
};
