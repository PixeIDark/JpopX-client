"use client";

import { FavoriteList as List } from "@/types/favorite-list.type";
import Picture from "@/components/ui/Picture";
import Link from "next/link";
import ListControlled from "@/app/(protected)/(lists)/mylist/_components/FavoriteList/ListControlled";
import React from "react";
import { getTimeAgo } from "@/utils/helpers/getTimeAgo";

interface DragAndDropHandler {
  draggedItemId: number | null;
  handleDragStart: (id: number, order: number, event?: React.DragEvent) => void; // 이벤트 매개변수 추가
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
  const updatedTime = getTimeAgo(list.updated_at);

  const onDragStart = (e: React.DragEvent) => handleDragStart(list.id, list.order, e);
  const onDragEnter = () => handleDragEnter(list.order);
  const onDragEnd = () => handleDragEnd(list.user_id);
  const onDragOver = (e: React.DragEvent) => handleDragOver(e);

  return (
    <ul
      draggable={true}
      onDragStart={onDragStart} // 수정된 핸들러 사용
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      className={`flex items-center justify-between py-[1px] transition-colors duration-200 hover:opacity-60 ${isDragging ? "bg-button-ghost opacity-50" : ""} ${draggedItemId !== null && !isDragging ? "border-t-2 border-dashed border-solid-default" : ""} `}
      data-id={list.id}
      data-order={list.order}
      data-index={index}
    >
      <Link
        href={`/mylist/${list.id}`}
        className="flex w-full items-center justify-between border-body-default py-2 hover:opacity-60"
        onClick={(e) => isDragging && e.preventDefault()}
      >
        <div className="flex items-center gap-4">
          <Picture
            src={list.image_url}
            alt={`${list.name}'s image`}
            className="h-14 w-14 rounded-lg"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-left text-base text-text-h">{list.name}</h1>
            <p className="text-sm text-text-p">{updatedTime}</p>
          </div>
        </div>
      </Link>
      <ListControlled listId={list.id} image={list.image_url} listName={list.name} />
    </ul>
  );
}

export default FavoriteList;
