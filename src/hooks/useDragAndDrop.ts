import React, { useCallback, useRef, useState } from "react";
import { UseMutateFunction } from "@tanstack/react-query";
import { ReorderListRequest, ReorderSongRequest } from "@/types/favorite-list.type";

export function useDragAndDrop(
  mutate: UseMutateFunction<ReorderSongRequest | ReorderListRequest, Error, unknown>
) {
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const dragStartIndex = useRef<number | null>(null);
  const dragEndIndex = useRef<number | null>(null);
  const autoScrollRequest = useRef<number | null>(null);

  const autoScroll = useCallback((clientY: number) => {
    const SCROLL_SPEED = 10;
    const TOP_SCROLL_ZONE = 90;
    const BOTTOM_SCROLL_ZONE = 150;
    const windowHeight = window.innerHeight;

    if (autoScrollRequest.current) {
      cancelAnimationFrame(autoScrollRequest.current);
      autoScrollRequest.current = null;
    }

    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    const scroll = () => {
      if (clientY >= 0 && clientY <= TOP_SCROLL_ZONE) {
        mainElement.scrollTop -= SCROLL_SPEED;
        autoScrollRequest.current = requestAnimationFrame(scroll); // 지피티가 셋인터벌보다 requestAnimationFrame 이 더 자연스럽다해서 씀 실험결과도 더 나음
      } else if (clientY >= windowHeight - BOTTOM_SCROLL_ZONE && clientY <= windowHeight) {
        mainElement.scrollTop += SCROLL_SPEED;
        autoScrollRequest.current = requestAnimationFrame(scroll);
      }
    };

    scroll();
  }, []);

  // 자동 스크롤 중지
  const stopAutoScroll = useCallback(() => {
    if (autoScrollRequest.current) {
      cancelAnimationFrame(autoScrollRequest.current);
      autoScrollRequest.current = null;
    }
  }, []);

  const createDragImage = useCallback((originalElement: HTMLElement) => {
    const dragImage = originalElement.cloneNode(true) as HTMLElement; // cloneNode 는 원본 요소의 요소와 자식요소들을 깊은 복사하는 역할

    dragImage.style.position = "absolute";
    dragImage.style.top = "-9999px"; // 요소를 화면에서 완전히 숨기기위함. hidden 속성을 사용하게 되면 setDragImage 가 작동을 안함
    dragImage.style.left = "-9999px";
    dragImage.style.pointerEvents = "none";
    dragImage.style.zIndex = "9999";

    const originalRect = originalElement.getBoundingClientRect(); // getBoundingClientRect 는 선택된 요소의 css 스타일에 대한 정보를 조회할 수 있음
    dragImage.style.width = `${originalRect.width}px`;
    dragImage.style.height = `${originalRect.height}px`;

    dragImage.style.opacity = "0.9";
    dragImage.style.transform = "rotate(-1deg) scale(1.02)";
    dragImage.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    dragImage.style.borderRadius = "12px";
    dragImage.style.border = "2px solid rgba(59, 130, 246, 0.5)";

    document.body.appendChild(dragImage); // setDragImage 가 사용할 요소로써 임시로 돔에 저장

    return dragImage;
  }, []);

  const handleDragStart = useCallback(
    (id: number, currentOrder: number, event?: React.DragEvent) => {
      setDraggedItemId(id);
      dragStartIndex.current = currentOrder;

      if (!event) return;

      const draggedElement = event.currentTarget as HTMLElement;
      const customDragImage = createDragImage(draggedElement);

      const rect = draggedElement.getBoundingClientRect();
      const offsetX = rect.width / 2;
      const offsetY = rect.height / 2;

      event.dataTransfer.setDragImage(customDragImage, offsetX, offsetY);
      event.dataTransfer.effectAllowed = "move";

      const handleDragMove = (e: DragEvent) => {
        autoScroll(e.clientY);
      };

      const handleRemoveDragImage = () => {
        if (document.body.contains(customDragImage)) {
          document.body.removeChild(customDragImage);
        }
        stopAutoScroll();
        document.removeEventListener("drag", handleDragMove);
        document.removeEventListener("dragend", handleRemoveDragImage);
      };

      document.addEventListener("drag", handleDragMove);
      document.addEventListener("dragend", handleRemoveDragImage);
    },
    [createDragImage, autoScroll, stopAutoScroll]
  );

  const handleDragEnter = useCallback((order: number) => (dragEndIndex.current = order), []);

  const handleDragEnd = useCallback(
    (userId: number) => {
      stopAutoScroll(); // 구조상 얘까지는 없어도되는데, 없으면 20번에 한번꼴로 버그 발생함

      if (
        draggedItemId &&
        dragStartIndex.current !== null &&
        dragEndIndex.current !== null &&
        dragStartIndex.current !== dragEndIndex.current
      ) {
        const mutateData =
          userId !== -1
            ? ({
                userId,
                listId: draggedItemId,
                newOrder: dragEndIndex.current,
              } as ReorderListRequest)
            : ({
                favoriteId: draggedItemId,
                newOrder: dragEndIndex.current,
              } as ReorderSongRequest);

        mutate(mutateData as ReorderSongRequest | ReorderListRequest);
      }

      setDraggedItemId(null);
      dragStartIndex.current = null;
      dragEndIndex.current = null;
    },
    [draggedItemId, mutate, stopAutoScroll]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return {
    draggedItemId,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDragOver,
  };
}
