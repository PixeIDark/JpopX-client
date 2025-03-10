"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { NameSchema, nameSchema } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/common/Field/TextField";
import { useSession } from "next-auth/react";
import { useUpdateNameMutation } from "@/query/users";

function ChangeNamePage() {
  const { data: userData } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameSchema>({
    resolver: zodResolver(nameSchema),
  });

  const { mutate: updateNameMutate, isPending } = useUpdateNameMutation();

  const onSubmit = (data: NameSchema) => {
    if (!data.name) return;

    updateNameMutate({
      data,
      email: userData?.user.email,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="name"
        name="name"
        type="text"
        placeholder="New Name"
        register={register}
        error={errors.name}
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

export default ChangeNamePage;
