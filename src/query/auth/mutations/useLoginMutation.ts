import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "@/types/auth.type";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/Toast/useToast";
import { useSearchParams } from "next/navigation";

export function useLoginMutation() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    },
    onSuccess: () => {
      toast({
        title: "Login Success",
        message: "Login Successfully Great!",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        message: `${error.message || "Login Failed So Sad.."}`,
        type: "error",
      });
    },
  });
}
