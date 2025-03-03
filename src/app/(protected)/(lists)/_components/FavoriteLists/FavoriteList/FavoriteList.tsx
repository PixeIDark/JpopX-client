import React from "react";
import { FavoriteList as List } from "@/types/favorite-list.type";
import Picture from "@/components/ui/Picture";
import { Circle } from "lucide-react";

interface FavoriteListProps {
  list: List;
}

function FavoriteList({ list }: FavoriteListProps) {
  return (
    <ul className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Picture
          src={list.image_url}
          alt={`${list.name}'s image`}
          width={56}
          height={56}
          className="rounded-lg"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-base text-text-h">{list.name}</h1>
          <p className="text-sm text-text-p">{list.updated_at}</p>
        </div>
      </div>
      <Circle strokeWidth={1.5} className="stroke-icon-stroke" />
    </ul>
  );
}

export default FavoriteList;
