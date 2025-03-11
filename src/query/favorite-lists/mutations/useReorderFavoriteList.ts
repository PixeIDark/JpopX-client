import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/Toast/useToast";
import { ReorderListRequest } from "@/types/favorite-list.type";
import { favoriteListsApi } from "@/api/favorite-lists";
import { getFavoriteListsKey } from "@/query/favorite-lists";

export function useReorderFavoriteList() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ReorderListRequest) => favoriteListsApi.reorderList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getFavoriteListsKey() });
      toast({
        title: "My List Order Changed Successfully",
        message: "My List Order Changed Successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed To Change My List Order",
        type: "error",
      });
    },
  });
}
