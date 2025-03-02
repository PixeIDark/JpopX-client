import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchQueryKey } from "@/query/search/key";
import { searchApi } from "@/api/search";
import { SearchPanelParams } from "@/types/search.type";

export type SearchQueryParams = SearchPanelParams & { text: string };

export function useSearchQuery(params: SearchQueryParams) {
  const { text, searchType, sort } = params;
  const limit = 10;

  return useInfiniteQuery({
    queryKey: getSearchQueryKey(params),
    queryFn: ({ pageParam = 1 }) =>
      searchApi({
        text,
        searchType,
        sort,
        page: pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { total, page, limit } = lastPage.data;
      const loadedItems = page * limit;

      return loadedItems < total ? page + 1 : undefined;
    },
    enabled: text?.length > 0,
  });
}
