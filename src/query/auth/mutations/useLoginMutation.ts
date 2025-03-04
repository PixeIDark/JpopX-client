import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "@/types/auth.type";
import { useToast } from "@/components/ui/Toast/useToast";
import { signInCredentialAction } from "@/lib/next-auth/nextAuthActions";
import { useRouter } from "next/navigation";

export function useLoginMutation() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const result = await signInCredentialAction(data);

      if (result?.error) {
        throw new Error(result.error);
      }
    },
    onSuccess: () => {
      router.back();
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
