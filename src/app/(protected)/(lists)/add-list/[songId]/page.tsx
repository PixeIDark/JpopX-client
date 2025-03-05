"use client";

import { useQuery } from "@tanstack/react-query";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import { use } from "react";
import AddToList from "@/app/(protected)/(lists)/add-list/[songId]/_components/AddToList";

function AddListPage({ params }: { params: Promise<{ songId: string }> }) {
  const { data: lists } = useQuery(favoriteListsOption);
  const { songId } = use(params);

  if (!lists || !songId) return null;

  const parsedSongId = parseInt(songId);

  return (
    <li className="flex flex-col">
      {lists.map((list) => (
        <AddToList key={list.id} list={list} songId={parsedSongId} />
      ))}
    </li>
  );
}

export default AddListPage;
