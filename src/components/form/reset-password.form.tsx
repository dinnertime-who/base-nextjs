"use client";

import { useAppForm } from "./core/app-form";
import { cn } from "@/lib/utils";
import { RequestResetPasswordSchema } from "@shared/schema/request-reset-password.schema";
import { useDialogService } from "@/hooks/use-dialog-service";
import { useAuthContract } from "@/hooks/contract/use-auth-contract";
import { tryCatch } from "@shared/try-catch";
import { ResetPasswordSchema } from "@shared/schema/reset-password.schema";
import { useRouter } from "next/navigation";

export const ResetPasswordForm = ({
  className,
  token,
}: {
  className?: string;
  token: string;
}) => {
  const dialogService = useDialogService();
  const { resetPassword } = useAuthContract();
  const router = useRouter();
  const form = useAppForm({
    defaultValues: { newPassword: "" },
    validators: {
      onChange: ResetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await tryCatch(async () => {
        return await resetPassword.mutateAsync({
          newPassword: value.newPassword,
          token,
        });
      });

      if (error) {
        await dialogService.alert(error.message);
        return;
      }

      await dialogService.alert(
        "비밀번호 재설정이 완료되었습니다. 다시 로그인해주세요."
      );

      router.push("/sign-in");
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
            name="newPassword"
            children={(field) => (
              <field.PasswordField placeholder="새로운 비밀번호를 입력해주세요." />
            )}
          ></form.AppField>
        </form.Fieldset>

        <form.SubmitButton>비밀번호 재설정</form.SubmitButton>
      </form.AppForm>
    </form>
  );
};
