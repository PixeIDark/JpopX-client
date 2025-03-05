"use server";

import React from "react";
import { getServerQueryClient } from "@/lib/tanStackQuery/getServerQueryClient";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CreateListButton from "@/app/(protected)/(lists)/_layout/CreateListButton";

async function ListsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery(favoriteListsOption);

  return (
    <div className="relative">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div>{children}</div>
      </HydrationBoundary>
      <div className="h-[60] w-full" />
      <CreateListButton />
    </div>
  );
}

export default ListsLayout;
