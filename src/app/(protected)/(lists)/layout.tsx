import React, { Suspense } from "react";
import { getServerQueryClient } from "@/lib/tanStackQuery/getServerQueryClient";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export const dynamic = "force-dynamic";

async function ListsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery(favoriteListsOption);

  return (
    <div>
      <Suspense fallback={<LoadingSpinner isLoading={true} size={48} />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div>{children}</div>
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}

export default ListsLayout;
