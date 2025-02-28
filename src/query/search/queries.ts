import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchQueryKey } from "@/query/search/key";
import { searchApi } from "@/api/search";

export function useSearchQuery(params: {
  text: string;
  searchType?: "both" | "artist" | "title" | "lyrics";
  sort?: "latest" | "popular";
  limit?: number;
}) {
  const { text, searchType, sort, limit = 20 } = params;

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
    enabled: text.length > 0,
  });
}
