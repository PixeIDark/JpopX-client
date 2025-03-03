import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { ReorderSongRequest } from "@/types/favorite-list.type";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListSongsKey } from "@/query/favorite-lists";

export function useReorderSongMutation(listId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ReorderSongRequest) => favoriteListsApi.reorderSong(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getFavoriteListSongsKey(listId) });
      toast({
        title: "Song Order Changed Successfully",
        message: "Song Order Changed Successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Change Song Order",
        type: "error",
      });
    },
  });
}
