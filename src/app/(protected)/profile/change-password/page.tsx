"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { passwordSchema, PasswordSchema } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import Link from "next/link";
import PasswordField from "@/components/common/Field/PasswordField";
import { useUpdatePasswordMutation } from "@/query/users";

function ChangePassword() {
  const { data: userData } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
  });

  const { mutate: updatePasswordMutate, isPending } = useUpdatePasswordMutation();

  const onSubmit = (data: PasswordSchema) => {
    if (!data.password) return;

    updatePasswordMutate({
      data,
      email: userData?.user.email,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        id="password"
        name="password"
        error={errors.password}
        placeholder="Password"
        register={register}
        className="py-3"
      />
      <PasswordField
        id="passwordConfirm"
        name="passwordConfirm"
        error={errors.passwordConfirm}
        placeholder="Confirm Password"
        register={register}
        className="py-3"
      />
      <div className="flex flex-col gap-3 py-3">
        <Button type="submit" variant="outline" disabled={isPending}>
          Changes
        </Button>
        <Button variant="link" asChild>
          <Link href="/profile">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}

export default ChangePassword;
