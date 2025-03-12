"use client";

import { useFavoriteListSongsQuery, useReorderSongMutation } from "@/query/favorite-lists";
import FavoriteSongCard from "@/app/(protected)/(lists)/mylist/[listId]/_components/FavoriteSongList/FavoirteSongCard";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import NotFound from "@/components/common/NotFound/NotFound";

interface FavoriteSongListProps {
  listId: number;
}

function FavoriteSongList({ listId }: FavoriteSongListProps) {
  const { data: list } = useFavoriteListSongsQuery(listId);
  const { mutate: reorderSongMutate } = useReorderSongMutation(listId);
  const dragAndDropHandler = useDragAndDrop(reorderSongMutate);

  if (!list?.length) return <NotFound text="Don't have any items" />;

  return (
    <li className="flex flex-col">
      {list.map((song) => (
        <FavoriteSongCard
          key={song.id}
          song={song}
          listId={listId}
          dragAndDropHandler={dragAndDropHandler}
        />
      ))}
    </li>
  );
}

export default FavoriteSongList;
