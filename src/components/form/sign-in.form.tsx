"use client";

import { SignInSchema } from "@shared/schema/sign-in.schema";
import { tryCatch } from "@shared/try-catch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContract } from "@/hooks/contract/use-auth-contract";
import { useDialogService } from "@/hooks/use-dialog-service";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { useAppForm } from "./core/app-form";

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
  const router = useRouter();
  const { getSession, signOut } = useAuthContract();
  const { signInEmail } = useAuthContract();
  const dialogService = useDialogService();
  const form = useAppForm({
    defaultValues: { email: "", password: "" },
    validators: {
      onChange: SignInSchema,
    },
    onSubmitMeta: defaultMeta,
    onSubmit: async ({ value, meta }) => {
      const { error } = await tryCatch(async () => {
        return await signInEmail.mutateAsync({
          email: value.email,
          password: value.password,
        });
      });

      if (error) {
        await dialogService.alert(error.message);
        return;
      }

      if (meta.signInType === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    },
  });

  useEffect(() => {
    if (getSession.data) {
      signOut.mutate();
    }
  }, [getSession.data, signOut.mutate]);

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
        </form.Fieldset>

        <form.SubmitButton>로그인</form.SubmitButton>
        <Link
          className={cn(buttonVariants({ variant: "outline" }), "w-full mt-2")}
          href="/sign-up"
        >
          회원가입
        </Link>
      </form.AppForm>
    </form>
  );
};
