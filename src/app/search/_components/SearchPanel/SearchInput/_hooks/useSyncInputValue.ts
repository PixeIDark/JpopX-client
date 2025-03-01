import { useEffect, useRef } from "react";

export function useSyncInputValue(initialValue: string) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && initialValue) {
      inputRef.current.value = initialValue;
    }
  }, [initialValue]);

  return inputRef;
}
