"use client";

import { SearchPanelParams } from "@/types/search.type";
import { useSearch } from "@/app/search/_components/SearchResult/_hooks/useSearch";
import SearchLoading from "@/app/search/_components/SearchResult/SearchLoading";
import NotFound from "@/components/common/NotFound/NotFound";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SearchList from "@/app/search/_components/SearchResult/SearchList";

interface SearchResultProps {
  params: SearchPanelParams;
}

const DISPLAY_COUNT = 2;

function SearchResult({ params }: SearchResultProps) {
  if (!params || params.text === undefined) return null;

  const { loadMoreRef, isLoading, songs, isFetchingNextPage, searchTotal } = useSearch({
    ...params,
    text: params.text, // 그냥 params 넣으면 params.text 는 string 인게 검증되었는데도 뭐라고함
  });

  if (isLoading) return <SearchLoading isLoading={isLoading} />;

  if (!songs.length) return <NotFound text="Don't have any songs!" />;

  const displayLimit = songs.length - DISPLAY_COUNT;
  const displayedSongs = songs.slice(0, displayLimit);
  const overflowSongs = songs.slice(displayLimit);

  return (
    <div className="mt-2">
      <p className="mb-2 text-sm font-normal text-text-p">{searchTotal} results</p>
      <SearchList songs={displayedSongs} />
      <div ref={loadMoreRef} className="h-0 w-full py-3" />
      <SearchList songs={overflowSongs} />
      {isFetchingNextPage && <LoadingSpinner isLoading={isFetchingNextPage} />}
    </div>
  );
}

export default SearchResult;
