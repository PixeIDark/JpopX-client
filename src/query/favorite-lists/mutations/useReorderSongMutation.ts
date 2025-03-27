import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { FavoriteListSong, ReorderSongRequest } from "@/types/favorite-list.type";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListSongsKey } from "@/query/favorite-lists";

export function useReorderSongMutation(listId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ReorderSongRequest) => favoriteListsApi.reorderSong(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: getFavoriteListSongsKey(listId) });
      const previousSongs = queryClient.getQueryData<FavoriteListSong[]>(
        getFavoriteListSongsKey(listId)
      );

      if (previousSongs) {
        const updatedSongs = [...previousSongs];

        const draggedItemIndex = updatedSongs.findIndex((song) => song.id === data.favoriteId);
        if (draggedItemIndex === -1) return { previousSongs };

        const targetItemIndex = updatedSongs.findIndex((song) => song.order === data.newOrder);
        if (targetItemIndex === -1) return { previousSongs };

        const draggedItemOrder = updatedSongs[draggedItemIndex].order;
        updatedSongs[draggedItemIndex].order = updatedSongs[targetItemIndex].order;
        updatedSongs[targetItemIndex].order = draggedItemOrder;

        updatedSongs.sort((a, b) => a.order - b.order);

        queryClient.setQueryData(getFavoriteListSongsKey(listId), updatedSongs);
      }

      return { previousSongs };
    },
    onSuccess: () => {
      toast({
        title: "Song Order Changed Successfully",
        message: "Song Order Changed Successfully",
        type: "success",
      });
    },
    onError: (error, _, context) => {
      if (context?.previousSongs)
        queryClient.setQueryData(getFavoriteListSongsKey(listId), context.previousSongs);

      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Change Song Order",
        type: "error",
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: getFavoriteListSongsKey(listId) }),
  });
}
