import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast/useToast";
import { usersApi } from "@/api/users";
import { NameSchema } from "@/lib/zod/auth";
import { decrypt } from "@/utils/decrypt";

interface UpdateNameParams {
  data: NameSchema;
  email: string | undefined;
}

export function useUpdateNameMutation() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ data, email }: UpdateNameParams) => {
      const passwordSessionStr = sessionStorage.getItem("password");
      if (!passwordSessionStr) throw new Error("Session Ded");

      const passwordSession = JSON.parse(passwordSessionStr);
      if (passwordSession.expires < Date.now()) {
        sessionStorage.removeItem("password");
        throw new Error("Session expired");
      }

      const password = decrypt(passwordSession.value || "");

      await usersApi.modify({ name: data.name });

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInResult?.ok) {
        throw new Error(signInResult?.error || "재인증에 실패했습니다.");
      }

      sessionStorage.removeItem("password");

      return true;
    },
    onSuccess: () => {
      toast({
        title: "Successfully Updated",
        message: "Change Name",
        type: "success",
      });
      router.push("/profile");
    },
    onError: (error) => {
      if (error instanceof Error) {
        router.push("/profile/verify/name");
      }
      toast({
        title: "Name Update Failed",
        message: error instanceof Error ? error.message : "Failed to update name.",
        type: "error",
      });
    },
  });
}
