"use client";

import { useEffect, useRef, useState } from "react";
import { useAOS } from "@/hooks/useAOS";
import { useIOS } from "@/hooks/useIOS";

function Main({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const isAOS = useAOS();
  const isIOS = useIOS();

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

  const overflowClass = isAOS ? "overflow-touch" : "overflow-y-auto";
  const paddingClass = hasScrollbar ? "pr-3 pl-4 " : "pr-4 pl-4 ";
  const blackClass = isIOS ? "h-[170px] w-full" : "h-[77px] w-full";

  return (
    <main ref={mainRef} className={`h-full ${overflowClass} ${paddingClass}`}>
      {children}
      <div className={blackClass} />
    </main>
  );
}

export default Main;
