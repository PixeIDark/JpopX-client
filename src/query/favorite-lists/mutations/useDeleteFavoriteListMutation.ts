import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListsKey } from "@/query/favorite-lists";

export function useDeleteFavoriteListMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (listId: number) => favoriteListsApi.deleteList(listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getFavoriteListsKey() });
      toast({
        title: "My List Deleted Successfully",
        message: "My List Deleted Successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Delete List",
        type: "error",
      });
    },
  });
}
