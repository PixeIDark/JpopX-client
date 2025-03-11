import Button from "@/components/ui/Button";
import React from "react";
import { SearchType } from "@/types/search.type";
import { useQueryParamState } from "@/hooks/useQueryParamState";

interface SearchFilterProps {
  initialSearchType: SearchType;
}

const SEARCH_TYPES = ["both", "title", "artist"] as const;

function SearchFilter({ initialSearchType }: SearchFilterProps) {
  const { choiceParam, applyQueryParams } = useQueryParamState(initialSearchType, "search");

  return (
    <div className="flex gap-3">
      {SEARCH_TYPES.map((type, idx) => (
        <Button
          key={idx}
          variant={choiceParam === type ? "outline" : "ghost"}
          value={type}
          onClick={applyQueryParams}
          className="h-11 max-w-[70px] text-sm"
        >
          {type}
        </Button>
      ))}
    </div>
  );
}

export default SearchFilter;
