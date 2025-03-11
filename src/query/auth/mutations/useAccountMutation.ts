import { useMutation } from "@tanstack/react-query";
import { AccountRequest } from "@/types/auth.type";
import { authApi } from "@/api/auth";
import { useToast } from "@/components/ui/Toast/useToast";
import { useRouter } from "next/navigation";

export function useAccountMutation() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: AccountRequest) => authApi.account(data),
    onSuccess: () => {
      router.push("/login");
      toast({
        title: "Account Login Success",
        message: "Account Login Successfully Great!",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Account Login Failed",
        message: `${error.message || "Account Login Failed Something went wrong!"}`,
        type: "error",
      });
    },
  });
}
