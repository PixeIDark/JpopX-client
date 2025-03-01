"use client";

import { SearchPanelParams } from "@/types/search.type";
import SongCard from "@/components/common/SongCard";
import { useSearch } from "@/app/search/_components/SearchResult/_hooks/useSearch";
import SearchLoading from "@/app/search/_components/SearchResult/SearchLoading";
import NotFound from "@/components/common/NotFound/NotFound";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface SearchResultProps {
  params: SearchPanelParams;
}

function SearchResult({ params }: SearchResultProps) {
  if (!params || !params.text) return null;
  const { loadMoreRef, isLoading, songs, isFetchingNextPage } = useSearch(params);

  if (isLoading) return <SearchLoading isLoading={isLoading} />;

  if (songs.length === 0) return <NotFound text="Don't have any songs!" />;

  return (
    <div className="flex flex-col gap-6">
      {songs.slice(0, songs.length - 2).map((song) => (
        <SongCard key={`${song.song_id}-${song.id}`} song={song} />
      ))}
      <div ref={loadMoreRef} className="-my-3 h-0 w-full" />
      {songs.slice(songs.length - 2).map((song) => (
        <SongCard key={`${song.song_id}-${song.id}`} song={song} />
      ))}
      {isFetchingNextPage && <LoadingSpinner isLoading={isFetchingNextPage} />}
    </div>
  );
}

export default SearchResult;
