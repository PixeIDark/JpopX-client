"use client";

import SearchInput from "@/app/(public)/search/_components/SearchPanel/SearchInput";
import SearchFilter from "@/app/(public)/search/_components/SearchPanel/SearchFilter";
import { SearchPanelParams } from "@/types/search.type";
import SearchSort from "@/app/(public)/search/_components/SearchPanel/SearchSort/SearchSort";

interface SearchPanelProps {
  params: SearchPanelParams;
}

function SearchPanel({ params }: SearchPanelProps) {
  const { text = "", searchType = "both", sort = "popular" } = params;

  return (
    <div className="mt-3 flex flex-col gap-3">
      <SearchInput initialText={text} />
      <SearchFilter initialSearchType={searchType} />
      <SearchSort initialSort={sort} />
    </div>
  );
}

export default SearchPanel;
