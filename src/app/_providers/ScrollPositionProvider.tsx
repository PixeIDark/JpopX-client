"use client";

import React, { useCallback, useEffect, useRef } from "react";

export function ScrollPositionProvider({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const previousUrlRef = useRef<string>("");

  const loadScroll = useCallback(() => {
    if (!mainRef.current) return;

    const scrollKey = `scroll_${window.location.href}`;
    const scrollValue = sessionStorage.getItem(scrollKey);

    if (scrollValue && Number(scrollValue) > 0) {
      mainRef.current.scrollTop = Number(scrollValue);
    }
  }, []);

  useEffect(() => {
    const mainElement = document.querySelector("main.overflow-y-auto");
    if (mainElement) mainRef.current = mainElement as HTMLDivElement;

    const updateScrollInUrl = () => {
      if (mainRef.current) {
        const scrollValue = Math.round(mainRef.current.scrollTop);
        if (scrollValue > 0) {
          const scrollKey = `scroll_${window.location.href}`;
          sessionStorage.setItem(scrollKey, scrollValue.toString());
        }

        previousUrlRef.current = window.location.href;
      }
      return true;
    };

    const handlePopState = () => {
      if (mainRef.current) {
        const scrollValue = Math.round(mainRef.current.scrollTop);
        if (scrollValue > 0) {
          const scrollKey = `scroll_${previousUrlRef.current}`;
          sessionStorage.setItem(scrollKey, scrollValue.toString());
        }

        previousUrlRef.current = window.location.href;

        setTimeout(loadScroll, 50);
      }
      return true;
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
