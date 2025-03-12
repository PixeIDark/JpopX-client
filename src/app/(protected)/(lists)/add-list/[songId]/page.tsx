"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import React, { use } from "react";
import AddToList from "@/app/(protected)/(lists)/add-list/[songId]/_components/AddToList";
import CreateListButton from "@/app/(protected)/(lists)/_components/CreateListButton";

function AddListPage({ params }: { params: Promise<{ songId: string }> }) {
  const { data: lists } = useSuspenseQuery(favoriteListsOption);
  const { songId } = use(params);

  if (!lists || !songId) return null;

  const parsedSongId = parseInt(songId);

  return (
    <li>
      {lists.map((list) => (
        <AddToList key={list.id} list={list} songId={parsedSongId} />
      ))}
      <CreateListButton />
    </li>
  );
}

export default AddListPage;
