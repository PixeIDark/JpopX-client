"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { delay } from "@/utils/helpers/delay";

export function ScrollPositionProvider({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const previousUrlRef = useRef<string>("");

  const loadScroll = useCallback(() => {
    if (!mainRef.current) return;

    const scrollKey = `scroll_${window.location.href}`;
    const scrollValue = sessionStorage.getItem(scrollKey);
    mainRef.current.scrollTop = Number(scrollValue);

    if (scrollValue && Number(scrollValue) > 0) mainRef.current.scrollTop = Number(scrollValue);
  }, []);

  useEffect(() => {
    const mainElement = document.querySelector("main.overflow-y-auto");
    if (mainElement) mainRef.current = mainElement as HTMLDivElement;

    const updateScrollInUrl = () => {
      if (mainRef.current) {
        const scrollValue = Math.round(mainRef.current.scrollTop);
        const scrollKey = `scroll_${window.location.href}`;
        sessionStorage.setItem(scrollKey, scrollValue.toString());

        previousUrlRef.current = window.location.href;
      }
    };

    const handlePopState = async () => {
      await delay(50);
      loadScroll();
      updateScrollInUrl();
    };

    document.addEventListener("click", updateScrollInUrl, { passive: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", updateScrollInUrl);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [loadScroll]);

  return <>{children}</>;
}
