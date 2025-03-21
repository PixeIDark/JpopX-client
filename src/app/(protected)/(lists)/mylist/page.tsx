"use client";

import FavoriteList from "@/app/(protected)/(lists)/mylist/_components/FavoriteList";
import { useFavoriteListsQuery, useReorderFavoriteList } from "@/query/favorite-lists";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import CreateListButton from "@/app/(protected)/(lists)/_components/CreateListButton";
import NotFound from "@/components/common/NotFound/NotFound";
import React from "react";

function MyListPage() {
  const { data: lists } = useFavoriteListsQuery();
  const { mutate: reorderFavoriteList } = useReorderFavoriteList();
  const dragAndDropHandler = useDragAndDrop(reorderFavoriteList);

  if (!lists?.length)
    return (
      <div>
        <NotFound text="Not Found List... Please Make List" />
        <CreateListButton />
      </div>
    );

  return (
    <li>
      {lists.map((list, index) => (
        <FavoriteList
          key={list.id}
          list={list}
          index={index}
          dragAndDropHandler={dragAndDropHandler}
        />
      ))}
      <CreateListButton />
    </li>
  );
}

export default MyListPage;
