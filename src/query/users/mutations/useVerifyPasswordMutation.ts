import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast/useToast";
import { encrypt } from "@/utils/encrypt";

interface VerifyPasswordParams {
  email: string | undefined;
  password: string;
  redirectPath: string;
  changeType: string;
}

export function useVerifyPasswordMutation() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password, redirectPath, changeType }: VerifyPasswordParams) => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result?.ok) {
        throw new Error(result?.error || "Failed to VerifyPassword");
      }

      if (changeType === "name") {
        const encryptedData = {
          value: encrypt(password),
          expires: Date.now() + 600000,
        };

        sessionStorage.setItem("password", JSON.stringify(encryptedData));
      }

      return true;
    },
    onSuccess: (_, variables) => {
      router.push(variables.redirectPath);
    },
    onError: (error) => {
      toast({
        title: "이거 뜨면 zod 태업하는거임",
        message: error instanceof Error ? error.message : "Failed to VerifyPassword",
        type: "error",
      });
    },
  });
}
