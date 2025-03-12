"use client";
import { useEffect, useRef, useState } from "react";

function Main({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);

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

  return (
    <main ref={mainRef} className={`h-full overflow-y-auto pl-4 ${hasScrollbar ? "pr-3" : "pr-4"}`}>
      {children}
    </main>
  );
}

export default Main;
