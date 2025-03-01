import { useCallback, useMemo, useRef } from "react";
import { SearchPanelParams } from "@/types/search.type";
import { useSearchQuery } from "@/query/search/queries/useSearchQuery";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export function useSearch(params: SearchPanelParams) {
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

  const songs = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.items) || [];
  }, [data]);

  return {
    songs,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
  };
}
