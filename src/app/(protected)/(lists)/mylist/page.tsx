"use client";

import { useQuery } from "@tanstack/react-query";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import FavoriteList from "@/app/(protected)/(lists)/mylist/_components/FavoriteList";

function MyListPage() {
  const { data: lists } = useQuery(favoriteListsOption);

  if (!lists) return null;

  return (
    <div>
      {lists.map((list) => (
        <FavoriteList key={list.id} list={list} />
      ))}
    </div>
  );
}

export default MyListPage;
