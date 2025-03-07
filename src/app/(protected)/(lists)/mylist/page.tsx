"use client";

import { useQuery } from "@tanstack/react-query";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import FavoriteList from "@/app/(protected)/(lists)/mylist/_components/FavoriteList";
import { useReorderFavoriteList } from "@/query/favorite-lists";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

function MyListPage() {
  const { data: lists } = useQuery(favoriteListsOption);
  const { mutate: reorderFavoriteList } = useReorderFavoriteList();
  const dragAndDropHandler = useDragAndDrop(reorderFavoriteList);

  if (!lists) return null;

  return (
    <div>
      {lists.map((list, index) => (
        <FavoriteList
          key={list.id}
          list={list}
          index={index}
          dragAndDropHandler={dragAndDropHandler}
        />
      ))}
    </div>
  );
}

export default MyListPage;
