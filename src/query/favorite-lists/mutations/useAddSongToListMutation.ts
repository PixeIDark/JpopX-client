import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { AddSongToListRequest } from "@/types/favorite-list.type";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListSongsKey } from "@/query/favorite-lists";

export function useAddSongToListMutation(listId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: AddSongToListRequest) => favoriteListsApi.addSongToList(listId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getFavoriteListSongsKey(listId) });
      toast({
        title: "Song Added To List Successfully",
        message: "Song Added To List Successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Add Song To List",
        type: "error",
      });
    },
  });
}
