"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { favoriteListsOption } from "@/query/favorite-lists/options/favoriteListsOption";

function FavoriteList() {
  const { data } = useSuspenseQuery(favoriteListsOption);

  console.log(data);

  return <div>리스트</div>;
}

export default FavoriteList;
