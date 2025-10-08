"use client";

import { useAppForm } from "./core/app-form";
import { cn } from "@/lib/utils";
import { SetUpAdminUserSchema } from "@shared/schema/set-up-admin-user.schema";
import { useRouter } from "next/navigation";
import { useDialogService } from "@/hooks/use-dialog-service";
import { useAuthContract } from "@/hooks/contract/use-auth-contract";

export const SetUpAdminUserForm = ({ className }: { className?: string }) => {
  const router = useRouter();
  const dialogService = useDialogService();
  const { setupAdminUser } = useAuthContract();
  const form = useAppForm({
    defaultValues: { email: "", password: "", name: "" },
    validators: {
      onChange: SetUpAdminUserSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await setupAdminUser.mutateAsync(value);

      if (res.status === 200) {
        await dialogService.alert("설정이 완료되었습니다.");
        router.push("/admin/sign-in");
        return;
      }

      if (
        res.status === 400 ||
        res.status === 409 ||
        res.status === 422 ||
        res.status === 500
      ) {
        await dialogService.alert(res.body.error);
        return;
      }

      await dialogService.alert("알 수 없는 오류가 발생했습니다.");
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
