"use server";

import React from "react";
import Button from "@/components/ui/Button";
import { getServerQueryClient } from "@/lib/tanStackQuery/getServerQueryClient";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

async function ListsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery(favoriteListsOption);

  return (
    <div className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="overflow-y-auto">{children}</div>
      </HydrationBoundary>
      <Button variant="active">Create New List</Button>
    </div>
  );
}

export default ListsLayout;
