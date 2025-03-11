import { queryOptions } from "@tanstack/react-query";
import { getFavoriteListSongsKey } from "@/query/favorite-lists";
import { favoriteListsApi } from "@/api/favorite-lists";

export const favoriteListSongsOption = (listId: number) =>
  queryOptions({
    queryKey: getFavoriteListSongsKey(listId),
    queryFn: () => favoriteListsApi.getListSongs(listId),
  });
