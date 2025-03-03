import { getQueryClient } from "@/app/_providers/QueryProvider";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";

async function AddListPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(favoriteListsOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>에드온</h1>
      </div>
    </HydrationBoundary>
  );
}

export default AddListPage;
