import { useEffect, useRef, useState } from "react";

export function useScrollPosition() {
  const scrollRef = useRef<HTMLElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const checkForScrollbar = () => {
      if (scrollRef.current) {
        const hasVerticalScrollbar =
          scrollRef.current.scrollHeight > scrollRef.current.clientHeight;
        setHasScrollbar(hasVerticalScrollbar);
      }
    };

    checkForScrollbar();

    window.addEventListener("resize", checkForScrollbar);

    const observer = new MutationObserver(checkForScrollbar);

    if (scrollRef.current) {
      observer.observe(scrollRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("resize", checkForScrollbar);
      observer.disconnect();
    };
  }, []);

  return { scrollRef, hasScrollbar };
}
