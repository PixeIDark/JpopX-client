import { useSuspenseQuery } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { getFavoriteListsKey } from "@/query/favorite-lists";

export function useFavoriteListsQuery() {
  return useSuspenseQuery({
    queryKey: getFavoriteListsKey(),
    queryFn: () => favoriteListsApi.getLists(),
  });
}
