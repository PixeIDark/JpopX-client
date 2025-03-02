import { RefObject, useEffect } from "react";

interface UseIntersectionObserverProps {
  target: RefObject<Element | null>;
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export function useIntersectionObserver({
  target,
  onIntersect,
  enabled = true,
  rootMargin = "0px",
  threshold = 0.1,
}: UseIntersectionObserverProps) {
  useEffect(() => {
    if (!enabled || !target.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    const element = target.current;
    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [target, enabled, onIntersect, rootMargin, threshold]);
}
