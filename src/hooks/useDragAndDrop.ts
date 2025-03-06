import { useMemo, useRef } from "react";
import { UseMutateFunction } from "@tanstack/react-query";

export function useDragAndDrop<T>(mutate: UseMutateFunction<any, Error, T, unknown>) {
  const dragId = useRef<null | number>(null);
  const dragOrder = useRef<null | number>(null);

  const handleDragStart = (id: number) => (dragId.current = id);

  const handleDragEnter = (order: number) => (dragOrder.current = order);

  const handleDragEnd = (userId?: number) => {
    if (dragId.current && dragOrder.current) {
      const mutateData: any = {
        listId: dragId.current,
        newOrder: dragOrder.current,
      };

      if (userId !== undefined) {
        mutateData.userId = userId;
      }

      mutate(mutateData);
    }

    dragId.current = null;
    dragOrder.current = null;
  };

  const handleDragOver = (e: { preventDefault: () => void }) => e.preventDefault();

  return useMemo(
    () => ({
      handleDragStart,
      handleDragEnter,
      handleDragEnd,
      handleDragOver,
    }),
    []
  );
}
