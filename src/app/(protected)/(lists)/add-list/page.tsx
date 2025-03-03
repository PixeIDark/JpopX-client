"use server";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import FavoriteLists from "../_components/FavoriteLists";
import { getServerQueryClient } from "@/lib/tanStackQuery/getServerQueryClient";

async function AddListPage() {
  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery(favoriteListsOption);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FavoriteLists />
      </HydrationBoundary>
    </div>
  );
}

export default AddListPage;
