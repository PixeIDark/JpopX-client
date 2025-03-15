import Picture from "@/components/ui/Picture";
import { FavoriteListSong } from "@/types/favorite-list.type";
import RemoveSongButton from "@/app/(protected)/(lists)/mylist/[listId]/_components/FavoriteSongList/FavoirteSongCard/RemoveSongButton";
import React from "react";

interface DragAndDropHandler {
  draggedItemId: number | null;
  handleDragStart: (id: number, order: number) => void;
  handleDragEnter: (order: number) => void;
  handleDragEnd: (userId: number) => void;
  handleDragOver: (e: React.DragEvent) => void;
}

interface SongCardProps {
  song: FavoriteListSong;
  listId: number;
  dragAndDropHandler: DragAndDropHandler;
}

function FavoriteSongCard({ song, listId, dragAndDropHandler }: SongCardProps) {
  const { draggedItemId, handleDragEnter, handleDragOver, handleDragStart, handleDragEnd } =
    dragAndDropHandler;
  const title = song.title_ko || song.title_ja;
  const artist = song.artist_ko || song.artist_ja;

  const isDragging = draggedItemId === listId;

  return (
    <ul
      draggable={true}
      onDragStart={() => handleDragStart(song.id, song.order)}
      onDragEnter={() => handleDragEnter(song.order)}
      onDragEnd={() => handleDragEnd(-1)}
      onDragOver={handleDragOver}
      className={`flex flex-row gap-1 py-3 transition-colors duration-200 ${isDragging ? "bg-button-ghost opacity-50" : ""} ${draggedItemId !== null && !isDragging ? "border-t-2 border-dashed border-solid-default" : ""} \`}`}
    >
      <div className="h-[70px] min-w-[70px]">
        <Picture
          src={song.thumbnail_url}
          alt={`${artist}'s ${title} Image`}
          className="h-[70px] w-[70px] rounded-xl object-fill"
        />
      </div>
      <div className="ml-3 flex w-full flex-col justify-between">
        <h1
          className="overflow-hidden text-ellipsis whitespace-nowrap text-text-h"
          style={{ maxWidth: "calc(152px + (187 - 152) * ((100vw - 365px) / 35))" }}
        >
          {title}
        </h1>
        <p
          className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-text-p"
          style={{ maxWidth: "calc(152px + (187 - 152) * ((100vw - 365px) / 35))" }}
        >
          {artist}
        </p>
        <div className="flex gap-2 text-sm">
          <p className="w-16 text-text-tj">TJ {song.tj_number}</p>
          <p className="text-text-ky">KY {song.kumyoung_number}</p>
        </div>
      </div>
      <RemoveSongButton listId={listId} favoriteId={song.id} />
    </ul>
  );
}

export default FavoriteSongCard;
