"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import React, { use } from "react";
import AddToList from "@/app/(protected)/(lists)/add-list/[songId]/_components/AddToList";
import CreateListButton from "@/app/(protected)/(lists)/_components/CreateListButton";
import NotFound from "@/components/common/NotFound/NotFound";

function AddListPage({ params }: { params: Promise<{ songId: string }> }) {
  const { data: lists } = useSuspenseQuery(favoriteListsOption);
  const { songId } = use(params);

  if (!songId) return null;

  const parsedSongId = parseInt(songId);
  const isLists = lists?.length > 0;
  
  if (!lists?.length)
    return (
      <div>
        <NotFound text="Not Found List... Please Make List" />
        <CreateListButton isLists={isLists} />
      </div>
    );

  return (
    <li>
      {lists.map((list) => (
        <AddToList key={list.id} list={list} songId={parsedSongId} />
      ))}
      <CreateListButton isLists={isLists} />
    </li>
  );
}

export default AddListPage;
