"use client";

import { FavoriteList as List } from "@/types/favorite-list.type";
import Picture from "@/components/ui/Picture";
import CheckFavoriteList from "@/app/(protected)/(lists)/add-list/[songId]/_components/AddToList/CheckFavoriteList";
import { useAddToListToggle } from "@/app/(protected)/(lists)/add-list/[songId]/_components/AddToList/_hooks/useAddToListToggle";
import Link from "next/link";
import { getTimeAgo } from "@/utils/helpers/getTimeAgo";

interface FavoriteListProps {
  list: List;
  songId: number;
}

function AddToList({ list, songId }: FavoriteListProps) {
  const { isChecked, handleToggle } = useAddToListToggle(list.id, songId);

  const listClass = isChecked ? "border-button-active " : "border-body-default";
  const updatedTime = getTimeAgo(list.updated_at);

  return (
    <ul
      className={`${listClass} flex w-full items-center justify-between rounded-xl border py-2 hover:opacity-60`}
    >
      <Link href={`/mylist/${list.id}`} className="flex w-full items-center gap-4">
        <Picture
          src={list.image_url}
          alt={`${list.name}'s image`}
          className="h-14 w-14 rounded-lg"
        />
        <div className="a flex flex-col justify-center">
          <h1 className="text-left text-base text-text-h">{list.name}</h1>
          <p className="text-sm text-text-p">{updatedTime}</p>
        </div>
      </Link>
      <button onClick={handleToggle} className="p-4">
        <CheckFavoriteList isChecked={isChecked} />
      </button>
    </ul>
  );
}

export default AddToList;
