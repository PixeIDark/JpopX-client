import React, { useMemo, useRef, useState } from "react";
import { UseMutateFunction } from "@tanstack/react-query";

export function useDragAndDrop<T>(mutate: UseMutateFunction<any, Error, T, unknown>) {
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const dragStartIndex = useRef<number | null>(null);
  const dragEndIndex = useRef<number | null>(null);

  const handleDragStart = (id: number, currentOrder: number) => {
    setDraggedItemId(id);
    dragStartIndex.current = currentOrder;
  };

  const handleDragEnter = (order: number) => (dragEndIndex.current = order);

  const handleDragEnd = (userId?: number) => {
    if (draggedItemId && dragStartIndex.current !== null && dragEndIndex.current !== null) {
      if (dragStartIndex.current !== dragEndIndex.current) {
        const mutateData: any = {
          listId: draggedItemId,
          newOrder: dragEndIndex.current,
        };

        if (userId !== undefined) {
          mutateData.userId = userId;
        }

        mutate(mutateData);
      }
    }

    setDraggedItemId(null);
    dragStartIndex.current = null;
    dragEndIndex.current = null;
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return useMemo(
    () => ({
      draggedItemId,
      handleDragStart,
      handleDragEnter,
      handleDragEnd,
      handleDragOver,
    }),
    [draggedItemId, mutate]
  );
}
