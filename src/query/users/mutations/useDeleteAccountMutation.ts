import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast/useToast";
import { usersApi } from "@/api/users";

export function useDeleteAccountMutation() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await usersApi.deleteAccount();
      return true;
    },
    onSuccess: async () => {
      await signOut({ redirect: false });
      router.push("/login");
      toast({
        title: "Account Deleted",
        message: "Your account has been deleted successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Delete Failed",
        message: error instanceof Error ? error.message : "Failed to delete account.",
        type: "error",
      });
    },
  });
}
