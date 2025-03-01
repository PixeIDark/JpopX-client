import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchQueryKey } from "@/query/search/key";
import { searchApi } from "@/api/search";
import { SearchPanelParams } from "@/types/search.type";

export function useSearchQuery(params: SearchPanelParams) {
  const { text, searchType, sort } = params;
  const limit = 10; // 한 번에 로드할 항목 수를 줄여 더 빠른 응답 및 UX 개선

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
      const { items, total, page, limit } = lastPage.data;
      const loadedItems = page * limit;

      return loadedItems < total ? page + 1 : undefined;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
