import { useQuery } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { getFavoriteListsKey } from "@/query/favorite-lists";

export function useFavoriteListsQuery() {
  return useQuery({
    queryKey: getFavoriteListsKey(),
    queryFn: () => favoriteListsApi.getLists(),
  });
}
