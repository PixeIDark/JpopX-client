import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/Toast/useToast";
import { FavoriteList, ReorderListRequest } from "@/types/favorite-list.type";
import { favoriteListsApi } from "@/api/favorite-lists";
import { getFavoriteListsKey } from "@/query/favorite-lists";

export function useReorderFavoriteListMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ReorderListRequest) => favoriteListsApi.reorderList(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: getFavoriteListsKey() });
      const previousLists = queryClient.getQueryData<FavoriteList[]>(getFavoriteListsKey());

      if (previousLists) {
        const updatedLists = previousLists
          .map((list) => {
            if (list.id === data.listId) {
              const offset = list.order < data.newOrder ? 0.5 : -0.5;

              return { ...list, order: data.newOrder + offset };
            }
            return list;
          })
          .toSorted((a, b) => a.order - b.order);

        queryClient.setQueryData(getFavoriteListsKey(), updatedLists);
      }

      return { previousLists };
    },
    onSuccess: () => {
      toast({
        title: "List Order Changed Successfully",
        message: "List Order Changed Successfully",
        type: "success",
      });
    },
    onError: (error, _, context) => {
      if (context?.previousLists) {
        queryClient.setQueryData(getFavoriteListsKey(), context.previousLists);
      }

      toast({
        title: "오류 발생",
        message: error instanceof Error ? error.message : "목록 순서 변경에 실패했습니다",
        type: "error",
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: getFavoriteListsKey() }),
  });
}
