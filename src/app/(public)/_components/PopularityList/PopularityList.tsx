"use client";

import { searchQueryOption } from "@/query/search/options/searchQueryOption";
import { useSuspenseQuery } from "@tanstack/react-query";
import SongCard from "@/components/common/SongCard";

function PopularityList() {
  const { data: songs } = useSuspenseQuery(
    searchQueryOption({ text: "", searchType: "both", sort: "popular" })
  );

  if (!songs) return null;

  return (
    <li className="mb-4 flex flex-col gap-6">
      {songs.items.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </li>
  );
}

export default PopularityList;
