import { useMutation } from "@tanstack/react-query";
import { AccountRequest } from "@/types/auth.type";
import { authApi } from "@/api/auth";
import { useToast } from "@/components/ui/Toast/useToast";

export function useAccountMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: AccountRequest) => authApi.account(data),
    onSuccess: () => {
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
