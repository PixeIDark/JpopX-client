"use client";

import SearchInput from "@/app/search/_components/SearchPanel/SearchInput";
import SearchFilter from "@/app/search/_components/SearchPanel/SearchFilter";
import { SearchPanelParams } from "@/types/search.type";
import SearchSort from "@/app/search/_components/SearchPanel/SearchSort/SearchSort";
import { useChangeUrl } from "@/app/search/_components/SearchPanel/_hooks/useChangeUrl";

interface SearchPanelProps {
  params: SearchPanelParams;
}

function SearchPanel({ params }: SearchPanelProps) {
  const { onApplySearchParams, searchType, text, sort } = useChangeUrl(params);

  return (
    <div className="mt-3 flex flex-col gap-3">
      <SearchInput handleApplyParams={onApplySearchParams} initialText={text || ""} />
      <SearchFilter
        handleApplyParams={onApplySearchParams}
        initialSearchType={searchType || "both"}
      />
      <SearchSort handleApplyParams={onApplySearchParams} initialSort={sort || "popular"} />
    </div>
  );
}

export default SearchPanel;
