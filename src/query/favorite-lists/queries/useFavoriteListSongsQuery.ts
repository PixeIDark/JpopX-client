import { useSuspenseQuery } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { getFavoriteListSongsKey } from "@/query/favorite-lists";

export function useFavoriteListSongsQuery(listId: number) {
  return useSuspenseQuery({
    queryKey: getFavoriteListSongsKey(listId),
    queryFn: () => favoriteListsApi.getListSongs(listId),
  });
}
