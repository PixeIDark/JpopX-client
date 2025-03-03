import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { UpdateFavoriteListRequest } from "@/types/favorite-list.type";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListKey, getFavoriteListsKey } from "@/query/favorite-lists";

export function useUpdateFavoriteListMutation(listId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateFavoriteListRequest) => favoriteListsApi.updateList(listId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getFavoriteListsKey() });
      queryClient.invalidateQueries({ queryKey: getFavoriteListKey(listId) });

      toast({
        title: "My List Updated Successfully",
        message: "My List Updated Successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Update My List",
        type: "error",
      });
    },
  });
}
