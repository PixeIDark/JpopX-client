"use client";

import { useEffect, useRef, useState } from "react";
import { useAndroid } from "@/hooks/useAndroid";

function Main({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const isAndroid = useAndroid();

  useEffect(() => {
    const checkForScrollbar = () => {
      if (mainRef.current) {
        const hasVerticalScrollbar = mainRef.current.scrollHeight > mainRef.current.clientHeight;
        setHasScrollbar(hasVerticalScrollbar);
      }
    };

    checkForScrollbar();

    window.addEventListener("resize", checkForScrollbar);

    const observer = new MutationObserver(checkForScrollbar);

    if (mainRef.current) {
      observer.observe(mainRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("resize", checkForScrollbar);
      observer.disconnect();
    };
  }, []);

  const overflowClass = isAndroid ? "overflow-touch" : "overflow-y-auto";
  const paddingClass = hasScrollbar ? "pr-3 pl-4 " : "pr-4 pl-4 ";

  return (
    <main ref={mainRef} className={`h-full ${overflowClass} ${paddingClass}`}>
      {children}
      <div className="h-[77px] w-full" />
    </main>
  );
}

export default Main;
