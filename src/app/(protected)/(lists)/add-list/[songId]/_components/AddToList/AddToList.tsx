"use client";

import { FavoriteList as List } from "@/types/favorite-list.type";
import Picture from "@/components/ui/Picture";
import CheckFavoriteList from "@/app/(protected)/(lists)/add-list/[songId]/_components/AddToList/CheckFavoriteList";
import { useAddToListToggle } from "@/app/(protected)/(lists)/add-list/[songId]/_components/AddToList/_hooks/useAddToListToggle";

interface FavoriteListProps {
  list: List;
  songId: number;
}

function AddToList({ list, songId }: FavoriteListProps) {
  const { isChecked, handleToggle } = useAddToListToggle(list.id, songId);

  return (
    <button onClick={handleToggle} className="flex w-full items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <Picture
          src={list.image_url}
          alt={`${list.name}'s image`}
          className="h-14 w-14 rounded-lg"
        />
        <div className="a flex flex-col justify-center">
          <h1 className="text-left text-base text-text-h">{list.name}</h1>
          <p className="text-sm text-text-p">{list.updated_at}</p>
        </div>
      </div>
      <CheckFavoriteList isChecked={isChecked} />
    </button>
  );
}

export default AddToList;
