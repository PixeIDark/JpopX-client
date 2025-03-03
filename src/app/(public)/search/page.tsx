"use server";

import SearchPanel from "@/app/(public)/search/_components/SearchPanel";
import SearchResult from "@/app/(public)/search/_components/SearchResult";
import { SearchPanelParams } from "@/types/search.type";

async function SearchPage({ searchParams }: { searchParams: Promise<SearchPanelParams> }) {
  const params = await searchParams;

  return (
    <div>
      <SearchPanel params={params} />
      <SearchResult params={params} />
    </div>
  );
}

export default SearchPage;
