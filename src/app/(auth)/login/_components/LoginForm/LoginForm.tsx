"use client";

import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/common/Field/TextField";
import PasswordField from "@/components/common/Field/PasswordField";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useLoginMutation } from "@/query/auth/mutations/useLoginMutation";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate: loginMutate } = useLoginMutation();

  const onSubmit = (data: LoginSchema) =>
    loginMutate({
      email: data.email,
      password: data.password,
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3 flex flex-col gap-6">
      <TextField
        id="email"
        name="email"
        type="email"
        error={errors.email}
        placeholder="Email Address"
        register={register}
      />
      <PasswordField
        id="password"
        name="password"
        error={errors.password}
        placeholder="Password"
        register={register}
      />
      <p className="-mt-2 text-text-p">Forgot password?</p>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading" : "Log in"}
      </Button>
      <Button type="submit" variant="link" asChild>
        <Link href="/account">New User Sign Up</Link>
      </Button>
    </form>
  );
}

export default LoginForm;
