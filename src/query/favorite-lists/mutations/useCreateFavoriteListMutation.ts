import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { CreateFavoriteListRequest, FavoriteList } from "@/types/favorite-list.type";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListsKey } from "@/query/favorite-lists";
import { getRandomInteger } from "@/utils/getRandomInteger";

export function useCreateFavoriteListMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateFavoriteListRequest) => favoriteListsApi.createList(data),
    onMutate: (data) => {
      queryClient.cancelQueries({ queryKey: getFavoriteListsKey() });
      const previousLists = queryClient.getQueryData<FavoriteList[]>(getFavoriteListsKey());

      if (previousLists) {
        const newList = {
          id: -1,
          user_id: -getRandomInteger(),
          name: data.name,
          order: previousLists[previousLists.length - 1].order + 1,
          image_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        };
        queryClient.setQueryData(getFavoriteListsKey(), [...previousLists, newList]);

        return { previousLists };
      }
    },
    onSuccess: () => {
      toast({
        title: "My List Created Successfully",
        message: "My List Created Successfully",
        type: "success",
      });
    },
    onError: (error, _, context) => {
      if (context?.previousLists)
        queryClient.setQueryData(getFavoriteListsKey(), context.previousLists);

      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Create My List",
        type: "error",
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: getFavoriteListsKey() }),
  });
}
