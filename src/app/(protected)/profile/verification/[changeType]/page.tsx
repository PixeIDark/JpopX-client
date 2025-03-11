"use client";

import Button from "@/components/ui/Button";
import { use } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PasswordField from "@/components/common/Field/PasswordField";
import { useForm } from "react-hook-form";
import { validateSchema, ValidateSchema } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerifyPasswordMutation } from "@/query/users";

function VerificationPage({ params }: { params: Promise<{ changeType: string }> }) {
  const { changeType } = use(params);
  const { data: userData } = useSession();
  const { mutate: verifyPasswordMutate, isPending } = useVerifyPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidateSchema>({
    resolver: zodResolver(validateSchema),
  });

  const nextPath = changeType === "name" ? "change-name" : "change-password";

  const onSubmit = (data: ValidateSchema) => {
    if (!data.password) return;

    verifyPasswordMutate({
      email: userData?.user.email,
      password: data.password,
      redirectPath: `/profile/${nextPath}`,
      changeType,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        id="password"
        name="password"
        placeholder="Password Verification"
        register={register}
        error={errors.password}
        className="py-3"
      />
      <div className="flex flex-col gap-3 py-3">
        <Button type="submit" variant="outline" disabled={isPending}>
          Next
        </Button>
        <Button variant="link" asChild>
          <Link href="/profile">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}

export default VerificationPage;
