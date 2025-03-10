import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/Toast/useToast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useLogoutMutation() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => signOut({ redirect: false }),
    onSuccess: () => {
      router.push("/login");
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
