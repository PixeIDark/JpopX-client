import { z } from "zod";

const email = z.string().min(1, "이메일을 입력해주세요").email("올바른 이메일 형식이 아닙니다");
const name = z.string().min(1, "이름을 입력해주세요");
const password = z
  .string()
  .min(1, "비밀번호를 입력해주세요")
  .min(8, "비밀번호는 8자 이상이어야 합니다");
const passwordConfirm = z.string().min(1, "비밀번호 확인을 입력해주세요");

export const loginSchema = z.object({
  email,
  password,
});

export const accountSchema = z
  .object({
    email,
    name,
    password,
    passwordConfirm,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type AccountSchema = z.infer<typeof accountSchema>;
