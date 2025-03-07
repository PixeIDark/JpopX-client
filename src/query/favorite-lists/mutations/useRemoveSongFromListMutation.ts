import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListSongsKey } from "@/query/favorite-lists";
import { FavoriteListSong } from "@/types/favorite-list.type";

export function useRemoveSongFromListMutation(listId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (favoriteId: number) => favoriteListsApi.removeSongFromList(favoriteId),
    onMutate: async (favoriteId) => {
      await queryClient.cancelQueries({ queryKey: getFavoriteListSongsKey(listId) });
      const previousSongs = queryClient.getQueryData<FavoriteListSong[]>(
        getFavoriteListSongsKey(listId)
      );

      if (previousSongs) {
        queryClient.setQueryData(
          getFavoriteListSongsKey(listId),
          previousSongs.filter((song) => song.id !== favoriteId)
        );
      }
      return { previousSongs };
    },
    onSuccess: (data) => {
      toast({
        title: "Song Removed From List Successfully",
        message: data.message,
        type: "success",
      });
    },
    onError: (error, _, context) => {
      if (context?.previousSongs)
        queryClient.setQueryData(getFavoriteListSongsKey(listId), context.previousSongs);

      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Remove Song From List",
        type: "error",
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: getFavoriteListSongsKey(listId) }),
  });
}
