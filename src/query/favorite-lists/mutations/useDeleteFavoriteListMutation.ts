import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListsKey } from "@/query/favorite-lists";
import { FavoriteList } from "@/types/favorite-list.type";

export function useDeleteFavoriteListMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (listId: number) => favoriteListsApi.deleteList(listId),
    onMutate: async (listId) => {
      await queryClient.cancelQueries({ queryKey: getFavoriteListsKey() });
      const previousLists = queryClient.getQueryData<FavoriteList[]>(getFavoriteListsKey());

      if (previousLists) {
        queryClient.setQueryData<FavoriteList[]>(
          getFavoriteListsKey(),
          previousLists.filter((list) => list.id !== listId)
        );
      }

      return { previousLists };
    },
    onSuccess: () => {
      toast({
        title: "My List Deleted Successfully",
        message: "My List Deleted Successfully",
        type: "success",
      });
    },
    onError: (error, _, context) => {
      if (context?.previousLists)
        queryClient.setQueryData(getFavoriteListsKey(), context.previousLists);

      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Delete List",
        type: "error",
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: getFavoriteListsKey() }),
  });
}
