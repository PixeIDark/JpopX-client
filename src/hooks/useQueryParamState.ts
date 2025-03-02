import React, { useState } from "react";
import { useSetUrlQuery } from "@/hooks/useSetUrlQuery";

export function useQueryParamState(initialParam: string, key: string) {
  const [choiceParam, setChoiceParams] = useState(initialParam);
  const setUrlQuery = useSetUrlQuery();

  const applyQueryParams = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const value = e.currentTarget.value as string;
    setChoiceParams(value);
    setUrlQuery(key, value);
  };

  return { choiceParam, applyQueryParams };
}
