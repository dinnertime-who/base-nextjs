import z from "zod";

export const RequestResetPasswordSchema = z.object({
  email: z.email({ message: "이메일 형식이 올바르지 않습니다." }),
});
