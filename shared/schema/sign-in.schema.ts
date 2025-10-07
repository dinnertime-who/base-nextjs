import z from "zod";

export const SignInSchema = z.object({
  email: z.email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z
    .string({ message: "비밀번호를 입력해주세요." })
    .min(1, { message: "비밀번호를 입력해주세요." }),
});
