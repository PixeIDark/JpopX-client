"use client";

import SearchInput from "@/app/search/_components/SearchPanel/SearchInput";
import SearchFilter from "@/app/search/_components/SearchPanel/SearchFilter";
import { SearchPanelParams } from "@/types/search.type";
import SearchSort from "@/app/search/_components/SearchPanel/SearchSort/SearchSort";
import { useRouter } from "next/navigation";

function SearchPanel() {
  const router = useRouter();

  const onApplySearchParams = (params: SearchPanelParams) => {
    const searchParams = new URLSearchParams([
      ["text", params.text || ""],
      ["searchType", params.searchType || "both"],
      ["sort", params.sort || "popular"],
    ]);
    router.push(`/search?${searchParams}`);
  };

  return (
    <div className="mt-3 flex flex-col gap-3">
      <SearchInput handleApplyParams={onApplySearchParams} />
      <SearchFilter handleApplyParams={onApplySearchParams} />
      <SearchSort handleApplyParams={onApplySearchParams} />
    </div>
  );
}

export default SearchPanel;
