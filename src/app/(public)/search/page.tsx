import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getServerQueryClient } from "@/lib/tanStackQuery/getServerQueryClient";
import SearchPanel from "@/app/(public)/search/_components/SearchPanel";
import SearchResult from "@/app/(public)/search/_components/SearchResult";
import { SearchPanelParams } from "@/types/search.type";
import { searchQueryOption } from "@/query/search/options/searchQueryOption";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchPanelParams>;
}) {
  const params = await searchParams;
  const queryClient = getServerQueryClient();

  if (params.text) {
    await queryClient.prefetchQuery(searchQueryOption(params));
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <SearchPanel params={params} />
        <SearchResult params={params} />
      </div>
    </HydrationBoundary>
  );
}
