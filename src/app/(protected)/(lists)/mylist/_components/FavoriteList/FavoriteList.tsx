"use client";

import { FavoriteList as List } from "@/types/favorite-list.type";
import Picture from "@/components/ui/Picture";
import Link from "next/link";
import ListControlled from "@/app/(protected)/(lists)/mylist/_components/FavoriteList/ListControlled";

interface FavoriteListProps {
  list: List;
}

function FavoriteList({ list }: FavoriteListProps) {
  return (
    <Link href={`/mylist/${list.id}`} className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <Picture
          src={list.image_url}
          alt={`${list.name}'s image`}
          width={56}
          height={56}
          className="rounded-lg"
        />
        <div className="a flex flex-col justify-center">
          <h1 className="text-left text-base text-text-h">{list.name}</h1>
          <p className="text-sm text-text-p">{list.updated_at}</p>
        </div>
      </div>
      <ListControlled />
    </Link>
  );
}

export default FavoriteList;
