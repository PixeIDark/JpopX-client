import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/Toast/useToast";
import { signOut } from "next-auth/react";

export function useLogoutMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => signOut({ redirect: true, callbackUrl: "/login" }),
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
