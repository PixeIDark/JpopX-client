"use server";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import FavoriteList from "@/app/(protected)/(myList)/_components/FavoriteList";
import { getServerQueryClient } from "@/lib/tanStackQuery/getServerQueryClient";

async function AddListPage() {
  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery(favoriteListsOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>에드온</h1>
        <FavoriteList />
      </div>
    </HydrationBoundary>
  );
}

export default AddListPage;
