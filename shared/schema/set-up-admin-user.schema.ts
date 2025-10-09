import z from "zod";

export const SetUpAdminUserSchema = z.object({
  email: z.email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z
    .string({ message: "비밀번호를 입력해주세요." })
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하이어야 합니다." })
    .regex(/[a-z]/, {
      message: "비밀번호는 소문자를 1개 이상 포함해야 합니다.",
    })
    .regex(/[A-Z]/, {
      message: "비밀번호는 대문자를 1개 이상 포함해야 합니다.",
    })
    .regex(/[0-9]/, { message: "비밀번호는 숫자를 1개 이상 포함해야 합니다." })
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
      message: "비밀번호는 특수문자를 1개 이상 포함해야 합니다.",
    }),
  name: z
    .string({ message: "이름을 입력해주세요." })
    .min(1, { message: "이름을 입력해주세요." }),
});

export type SetUpAdminUserSchemaType = z.infer<typeof SetUpAdminUserSchema>;
