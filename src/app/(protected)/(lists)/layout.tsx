"use server";

import React from "react";
import { getServerQueryClient } from "@/lib/tanStackQuery/getServerQueryClient";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

async function ListsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getServerQueryClient();

  queryClient.prefetchQuery(favoriteListsOption);

  return (
    <div className="relative">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div>{children}</div>
      </HydrationBoundary>
    </div>
  );
}

export default ListsLayout;
