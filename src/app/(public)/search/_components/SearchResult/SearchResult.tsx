"use client";

import { SearchPanelParams } from "@/types/search.type";
import { useSearch } from "@/app/(public)/search/_components/SearchResult/_hooks/useSearch";
import SearchLoading from "@/app/(public)/search/_components/SearchResult/SearchLoading";
import NotFound from "@/components/common/NotFound/NotFound";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SearchList from "@/app/(public)/search/_components/SearchResult/SearchList";

interface SearchResultProps {
  params: SearchPanelParams;
}

const DISPLAY_COUNT = 2;

function SearchResult({ params }: SearchResultProps) {
  const { loadMoreRef, isLoading, songs, isFetchingNextPage, searchTotal } = useSearch({
    ...params,
    text: params.text || "",
  });

  if (isLoading) return <SearchLoading isLoading={isLoading} />;
  if (!songs.length) return <NotFound text="Don't have any songs!" />;

  const displayLimit = Math.max(0, songs.length - DISPLAY_COUNT);
  const displayedSongs = songs.slice(0, displayLimit);
  const overflowSongs = songs.slice(displayLimit);

  return (
    <div className="mt-2">
      <p className="mb-2 text-sm font-normal text-text-p">{searchTotal} results</p>
      {displayedSongs.length > 0 && <SearchList songs={displayedSongs} />}
      <div ref={loadMoreRef} className="h-0 w-full py-3" />
      {overflowSongs.length > 0 && <SearchList songs={overflowSongs} />}
      {isFetchingNextPage && <LoadingSpinner isLoading={isFetchingNextPage} />}
    </div>
  );
}

export default SearchResult;
