"use client";

import { useAppForm } from "./core/app-form";
import { cn } from "@/lib/utils";
import { RequestResetPasswordSchema } from "@shared/schema/request-reset-password.schema";
import { useDialogService } from "@/hooks/use-dialog-service";
import { useAuthContract } from "@/hooks/contract/use-auth-contract";
import { tryCatch } from "@shared/try-catch";

export const RequestResetPasswordForm = ({
  className,
}: {
  className?: string;
}) => {
  const dialogService = useDialogService();
  const { requestPasswordReset } = useAuthContract();
  const form = useAppForm({
    defaultValues: { email: "" },
    validators: {
      onChange: RequestResetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await tryCatch(async () => {
        return await requestPasswordReset.mutateAsync(value.email);
      });

      if (error) {
        await dialogService.alert(error.message);
        return;
      }

      await dialogService.alert(
        "비밀번호 재설정 이메일이 발송되었습니다. 메일을 확인해주세요."
      );
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
            name="email"
            children={(field) => (
              <field.TextField placeholder="회원가입 시 입력한 이메일을 입력해주세요." />
            )}
          ></form.AppField>
        </form.Fieldset>

        <form.SubmitButton>비밀번호 재설정</form.SubmitButton>
      </form.AppForm>
    </form>
  );
};
