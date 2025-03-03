import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { CreateFavoriteListRequest } from "@/types/favorite-list.type";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListsKey } from "@/query/favorite-lists";

export function useCreateFavoriteListMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateFavoriteListRequest) => favoriteListsApi.createList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getFavoriteListsKey() });
      toast({
        title: "My List Created Successfully",
        message: "My List Created Successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Create My List",
        type: "error",
      });
    },
  });
}
