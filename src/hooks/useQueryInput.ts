import React, { FormEvent, useEffect, useRef } from "react";
import { useSetUrlQuery } from "@/hooks/useSetUrlQuery";

interface UseQueryInputReturn {
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleSubmit: (e: FormEvent) => void;
}

export function useQueryInput(initialText: string = "", param: string): UseQueryInputReturn {
  const inputRef = useRef<HTMLInputElement>(null);
  const setUrlQuery = useSetUrlQuery();

  useEffect(() => {
    if (inputRef.current && initialText) {
      inputRef.current.value = initialText;
    }
  }, [initialText]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = inputRef.current?.value.trim() || "";
    setUrlQuery(param, text);
  };

  return {
    inputRef,
    handleSubmit,
  };
}
