import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/Toast/useToast";
import { FavoriteList, ReorderListRequest } from "@/types/favorite-list.type";
import { favoriteListsApi } from "@/api/favorite-lists";
import { getFavoriteListsKey } from "@/query/favorite-lists";

export function useReorderFavoriteList() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ReorderListRequest) => favoriteListsApi.reorderList(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: getFavoriteListsKey() });

      const previousLists = queryClient.getQueryData<FavoriteList[]>(getFavoriteListsKey());

      if (previousLists) {
        const updatedLists = [...previousLists];

        const draggedItemIndex = updatedLists.findIndex((list) => list.id === data.listId);
        if (draggedItemIndex === -1) return { previousLists };

        const targetItemIndex = updatedLists.findIndex((list) => list.order === data.newOrder);
        if (targetItemIndex === -1) return { previousLists };

        const draggedItemOrder = updatedLists[draggedItemIndex].order;
        updatedLists[draggedItemIndex].order = updatedLists[targetItemIndex].order;
        updatedLists[targetItemIndex].order = draggedItemOrder;

        updatedLists.sort((a, b) => a.order - b.order);

        queryClient.setQueryData(getFavoriteListsKey(), updatedLists);
      }

      return { previousLists };
    },
    onSuccess: () => {
      toast({
        title: "목록 순서 변경 완료",
        message: "목록 순서가 성공적으로 변경되었습니다",
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
