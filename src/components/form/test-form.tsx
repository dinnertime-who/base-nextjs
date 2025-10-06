"use client";

import z from "zod";
import { useAppForm, withForm } from "./app-form";
import { wait } from "@/lib/utils";

const useTestForm = () => {
  return useAppForm({
    defaultValues: {
      username: "",
      age: 0,
    },
    validators: {
      // Pass a schema or function to validate
      onChange: z.object({
        username: z.email({ message: "이메일 형식이 올바르지 않습니다." }),
        age: z.number().min(13),
      }),
    },
    onSubmit: async ({ value }) => {
      await wait(1000);
      // Do something with form data
      alert(JSON.stringify(value, null, 2));
    },
  });
};

export const TestForm = () => {
  const form = useTestForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit(e);
      }}
    >
      <TestTextField form={form} />

      <form.AppField
        name="age"
        children={(field) => (
          <field.NumberField placeholder="나이를 입력해주세요" />
        )}
      ></form.AppField>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <form.SubmitButton type="submit" disabled={!canSubmit}>
            {isSubmitting ? "Submitting..." : canSubmit ? "Submit" : "Submit"}
          </form.SubmitButton>
        )}
      />
    </form>
  );
};

const TestTextField = withForm({
  defaultValues: {
    username: "",
    age: 0,
  },
  render: function Render({ form }) {
    return (
      <form.AppField
        name="username"
        children={(field) => (
          <field.PasswordField placeholder="비밀번호를 입력해주세요" />
        )}
      ></form.AppField>
    );
  },
});
