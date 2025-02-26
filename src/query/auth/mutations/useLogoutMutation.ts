import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { useToast } from "@/components/ui/Toast/useToast";

export function useLogoutMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      toast({
        title: "Logout Success",
        message: "Logout Successfully Great!",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Logout Failed",
        message: `${error.message || "Logout Failed Stay Restored!"}`,
        type: "error",
      });
    },
  });
}
