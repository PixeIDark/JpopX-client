import React from "react";
import { getServerQueryClient } from "@/lib/tanStackQuery/getServerQueryClient";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div>{children}</div>
      </HydrationBoundary>
    </div>
  );
}

export default ListsLayout;
