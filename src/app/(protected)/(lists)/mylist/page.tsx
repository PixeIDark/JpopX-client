"use client";

import FavoriteList from "@/app/(protected)/(lists)/mylist/_components/FavoriteList";
import { useFavoriteListsQuery, useReorderFavoriteList } from "@/query/favorite-lists";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import CreateListButton from "@/app/(protected)/(lists)/_components/CreateListButton";

export const dynamic = "force-dynamic";

function MyListPage() {
  const { data: lists } = useFavoriteListsQuery();
  const { mutate: reorderFavoriteList } = useReorderFavoriteList();
  const dragAndDropHandler = useDragAndDrop(reorderFavoriteList);

  if (!lists) return null;

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
