import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListSongsKey } from "@/query/favorite-lists";

export function useRemoveSongFromListMutation(listId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (favoriteId: number) => favoriteListsApi.removeSongFromList(favoriteId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: getFavoriteListSongsKey(listId) });
      toast({
        title: "Song Removed From List Successfully",
        message: data.message,
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Remove Song From List",
        type: "error",
      });
    },
  });
}
