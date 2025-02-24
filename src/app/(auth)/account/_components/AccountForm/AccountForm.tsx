"use client";

import { useForm } from "react-hook-form";
import { accountSchema, AccountSchema } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/common/Field/TextField";
import PasswordField from "@/components/common/Field/PasswordField";
import Button from "@/components/ui/Button";
import { authApi } from "@/api/auth";

function AccountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
  });

  const onSubmit = async (data: AccountSchema) => {
    await authApi.account(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3 flex flex-col gap-6">
      <TextField
        id="name"
        name="name"
        type="text"
        error={errors.name}
        placeholder="Your name"
        register={register}
      />
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
      <PasswordField
        id="passwordConfirm"
        name="passwordConfirm"
        error={errors.passwordConfirm}
        placeholder="Confirm Password"
        register={register}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading" : "Account"}
      </Button>
    </form>
  );
}

export default AccountForm;
