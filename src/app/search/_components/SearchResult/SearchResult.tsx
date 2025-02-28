"use client";

import { SearchPanelParams } from "@/types/search.type";
import { useSearchQuery } from "@/query/search/queries";

interface SearchResultProps {
  params: SearchPanelParams;
}

function SearchResult({ params }: SearchResultProps) {
  if (!params) return null;

  const { data: searchResult } = useSearchQuery(params);
  console.log(searchResult?.pages[0]?.data.items);

  return <div>결과</div>;
}

export default SearchResult;
