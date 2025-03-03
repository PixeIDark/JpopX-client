import { queryOptions } from "@tanstack/react-query";
import { getFavoriteListsKey } from "@/query/favorite-lists";
import { favoriteListsApi } from "@/api/favorite-lists";

export const favoriteListsOption = queryOptions({
  queryKey: getFavoriteListsKey(),
  queryFn: () => favoriteListsApi.getLists(),
});
