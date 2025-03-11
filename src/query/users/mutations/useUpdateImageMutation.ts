import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/Toast/useToast";
import { usersApi } from "@/api/users";
import { upload } from "@/api/upload";
import { useSession } from "next-auth/react";

interface UpdateProfileRequest {
  file?: File | null;
}

export function useUpdateImageMutation() {
  const { toast } = useToast();
  const { update } = useSession();

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      if (!data.file) return null;

      const uploadResult = await upload(data.file);

      return usersApi.modify({ profile_image_url: uploadResult.url });
    },
    onSuccess: async (data) => {
      await update({ user: { profile_image_url: data?.profile_image_url } });
      toast({
        title: "Successfully Updated",
        message: "Your profile has been updated",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        message: error instanceof Error ? error.message : "Failed to update profile",
        type: "error",
      });
    },
  });
}
