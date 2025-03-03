"use client";

import { useQuery } from "@tanstack/react-query";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";
import FavoriteList from "@/app/(protected)/(lists)/_components/FavoriteLists/FavoriteList";
import FuckAccessToken from "@/app/_components/test/FuckAccessToken";
import GetMe from "@/app/_components/test/GetMe";

function FavoriteLists() {
  const { data: lists } = useQuery(favoriteListsOption);

  if (!lists) return null;

  return (
    <li className="flex flex-col gap-4">
      {lists.map((list) => (
        <FavoriteList key={list.id} list={list} />
      ))}
      <FuckAccessToken />
      <GetMe />
    </li>
  );
}

export default FavoriteLists;
