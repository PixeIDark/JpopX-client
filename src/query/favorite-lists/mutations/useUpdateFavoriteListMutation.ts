import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { FavoriteList, UpdateFavoriteListRequest } from "@/types/favorite-list.type";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListKey, getFavoriteListsKey } from "@/query/favorite-lists";
import { upload } from "@/api/upload";

export function useUpdateFavoriteListMutation(listId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (
      data: UpdateFavoriteListRequest & {
        isOptimistic?: boolean;
        file?: File | null;
      }
    ) => {
      if (!data.isOptimistic || !data.file) {
        return favoriteListsApi.updateList(listId, {
          name: data.name,
          image_url: data.image_url,
        });
      }

      const uploadResult = await upload(data.file);

      return favoriteListsApi.updateList(listId, {
        name: data.name,
        image_url: uploadResult.url,
      });
    },
    onMutate: async (data) => {
      queryClient.cancelQueries({ queryKey: getFavoriteListsKey() });
      const previousLists = queryClient.getQueryData<FavoriteList[]>(getFavoriteListsKey());

      if (previousLists) {
        const optimisticIndex = previousLists.findIndex((list) => list.id === listId);

        if (optimisticIndex !== -1) {
          const updatedLists = [...previousLists];

          updatedLists[optimisticIndex] = {
            ...updatedLists[optimisticIndex],
            name: data.name ?? updatedLists[optimisticIndex].name,
            image_url: data.image_url ?? updatedLists[optimisticIndex].image_url,
          };

          queryClient.setQueryData(getFavoriteListsKey(), updatedLists);
        }
      }

      return { previousLists };
    },
    onSuccess: () => {
      toast({
        title: "My List Updated Successfully",
        message: "My List Updated Successfully",
        type: "success",
      });
    },
    onError: (error, _, context) => {
      if (context?.previousLists) {
        queryClient.setQueryData(getFavoriteListsKey(), context.previousLists);
      }

      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Update My List",
        type: "error",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getFavoriteListsKey() });
      queryClient.invalidateQueries({ queryKey: getFavoriteListKey(listId) });
    },
  });
}
