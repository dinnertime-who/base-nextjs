"use client";

import { SignInSchema } from "@shared/schema/sign-in.schema";
import { useAppForm } from "./core/app-form";
import { cn, wait } from "@/lib/utils";

type FormMeta = {
  signInType: "admin" | "platform";
};

const defaultMeta: FormMeta = {
  signInType: "platform",
};

export const SignInForm = ({
  className,
  signInType,
}: {
  className?: string;
  signInType: FormMeta["signInType"];
}) => {
  const form = useAppForm({
    defaultValues: { email: "", password: "" },
    validators: {
      onChange: SignInSchema,
    },
    onSubmitMeta: defaultMeta,
    onSubmit: async ({ value, meta }) => {
      await wait(1000);
      // Do something with form data
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit({ signInType });
      }}
    >
      <form.AppForm>
        <form.Fieldset>
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

        <form.SubmitButton>로그인</form.SubmitButton>
      </form.AppForm>
    </form>
  );
};
