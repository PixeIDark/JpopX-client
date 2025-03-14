import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast/useToast";
import { createCallbackUrl } from "@/utils/createCallbackUrl";

export function useAddSongToListButton(songId: number) {
  const { status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const handlePathToRightPage = () => {
    if (status === "authenticated") router.push(`/add-list/${songId}`);
    else {
      router.push(createCallbackUrl(`/add-list/${songId}`));
      toast({
        title: "Please use after logging in.",
        message: "Log in and enjoy!",
        type: "error",
      });
    }
  };

  return { handlePathToRightPage };
}
