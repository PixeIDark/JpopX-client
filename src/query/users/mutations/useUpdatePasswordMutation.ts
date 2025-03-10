import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast/useToast";
import { usersApi } from "@/api/users";
import { PasswordSchema } from "@/lib/zod/auth";

interface UpdatePasswordParams {
  data: PasswordSchema;
  email: string | undefined;
}

export function useUpdatePasswordMutation() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ data, email }: UpdatePasswordParams) => {
      await usersApi.modify({ password: data.password });

      const result = await signIn("credentials", {
        email,
        password: data.password,
        redirect: false,
      });

      if (!result?.ok) {
        throw new Error(result?.error || "재인증에 실패했습니다.");
      }

      return true;
    },
    onSuccess: () => {
      toast({
        title: "Successfully Updated",
        message: "Change Password",
        type: "success",
      });
      router.push("/profile");
    },
    onError: (error) => {
      toast({
        title: "Password Update Failed",
        message: error instanceof Error ? error.message : "Failed to update password.",
        type: "error",
      });
    },
  });
}
