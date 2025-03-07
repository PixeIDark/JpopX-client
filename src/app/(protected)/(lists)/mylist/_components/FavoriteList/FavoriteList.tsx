"use client";

import { FavoriteList as List } from "@/types/favorite-list.type";
import Picture from "@/components/ui/Picture";
import Link from "next/link";
import ListControlled from "@/app/(protected)/(lists)/mylist/_components/FavoriteList/ListControlled";
import React from "react";

interface DragAndDropHandler {
  draggedItemId: number | null;
  handleDragStart: (id: number, order: number) => void;
  handleDragEnter: (order: number) => void;
  handleDragEnd: (userId: number) => void;
  handleDragOver: (e: React.DragEvent) => void;
}

interface FavoriteListProps {
  list: List;
  dragAndDropHandler: DragAndDropHandler;
  index: number;
}

function FavoriteList({ list, dragAndDropHandler, index }: FavoriteListProps) {
  const { draggedItemId, handleDragEnter, handleDragOver, handleDragStart, handleDragEnd } =
    dragAndDropHandler;

  const isDragging = draggedItemId === list.id;

  return (
    <div
      draggable={true}
      onDragStart={() => handleDragStart(list.id, list.order)}
      onDragEnter={() => handleDragEnter(list.order)}
      onDragEnd={() => handleDragEnd(list.user_id)}
      onDragOver={handleDragOver}
      className={`flex items-center justify-between transition-colors duration-200 ${isDragging ? "bg-button-ghost opacity-50" : ""} ${draggedItemId !== null && !isDragging ? "border-t-2 border-dashed border-solid-default" : ""} `}
      data-id={list.id}
      data-order={list.order}
      data-index={index}
    >
      <Link
        href={`/mylist/${list.id}`}
        className="flex w-full items-center justify-between py-2"
        onClick={(e) => isDragging && e.preventDefault()}
      >
        <div className="flex items-center gap-4">
          <Picture
            src={list.image_url}
            alt={`${list.name}'s image`}
            width={56}
            height={56}
            className="rounded-lg"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-left text-base text-text-h">{list.name}</h1>
            <p className="text-sm text-text-p">{list.updated_at}</p>
          </div>
        </div>
      </Link>
      <ListControlled listId={list.id} />
    </div>
  );
}

export default FavoriteList;
