"use client";

import { SignUpSchema } from "@shared/schema/sign-up.schema";
import { tryCatch } from "@shared/try-catch";
import { useRouter } from "next/navigation";
import { useAuthContract } from "@/hooks/contract/use-auth-contract";
import { useDialogService } from "@/hooks/use-dialog-service";
import { cn } from "@/lib/utils";
import { useAppForm } from "./core/app-form";

export const SignUpForm = ({ className }: { className?: string }) => {
  const dialogService = useDialogService();
  const { signUpEmail } = useAuthContract();
  const router = useRouter();
  const form = useAppForm({
    defaultValues: { email: "", password: "", name: "" },
    validators: {
      onChange: SignUpSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await tryCatch(async () => {
        return await signUpEmail.mutateAsync({
          email: value.email,
          password: value.password,
          name: value.name,
        });
      });

      if (error) {
        await dialogService.alert(error.message);
        return;
      }

      await dialogService.alert(
        "인증메일이 발송되었습니다. 메일을 확인해주세요.",
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
          <form.AppField name="email">
            {(field) => (
              <field.TextField placeholder="이메일을 입력해주세요." />
            )}
          </form.AppField>

          <form.AppField name="password">
            {(field) => (
              <field.PasswordField placeholder="비밀번호를 입력해주세요." />
            )}
          </form.AppField>

          <form.AppField name="name">
            {(field) => <field.TextField placeholder="이름을 입력해주세요." />}
          </form.AppField>
        </form.Fieldset>

        <form.SubmitButton>회원가입</form.SubmitButton>
      </form.AppForm>
    </form>
  );
};
