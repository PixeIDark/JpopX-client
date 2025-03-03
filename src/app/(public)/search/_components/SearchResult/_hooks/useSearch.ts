import { useCallback, useRef } from "react";
import { SearchQueryParams, useSearchQuery } from "@/query/search/queries/useSearchQuery";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export function useSearch(params: SearchQueryParams) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useSearchQuery(params);

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: handleIntersect,
    enabled: hasNextPage,
    rootMargin: "20%",
  });

  const searchTotal = data?.pages[0].data.total || 0;
  const songs = data?.pages.flatMap((page) => page.data.items) || [];

  return {
    searchTotal,
    songs,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
  };
}
