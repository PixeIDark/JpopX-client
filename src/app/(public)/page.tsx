import { getServerQueryClient } from "@/lib/tanStackQuery/getServerQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PopularityList from "@/app/(public)/_components/PopularityList";
import { searchQueryOption } from "@/query/search/options/searchQueryOption";

export const dynamic = "force-static";

async function HomePage() {
  const queryClient = getServerQueryClient();

  queryClient.prefetchQuery(searchQueryOption({ text: "", searchType: "both", sort: "popular" }));

  return (
    <div>
      <h1 className="py-2 text-center text-text-p">Top 10</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PopularityList />
      </HydrationBoundary>
    </div>
  );
}

export default HomePage;
