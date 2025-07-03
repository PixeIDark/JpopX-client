"use client";

import Button from "@/components/ui/Button";
import { Sort } from "@/types/search.type";
import { useQueryParamState } from "@/hooks/useQueryParamState";

interface SearchSortProps {
  initialSort: Sort;
}

const SORT_TYPES = ["popular", "latest"] as const;

function SearchSort({ initialSort }: SearchSortProps) {
  const { choiceParam, applyQueryParams } = useQueryParamState(initialSort, "search");

  return (
    <div className="flex rounded-xl bg-button-ghost p-1">
      {SORT_TYPES.map((sort, idx) => (
        <Button
          key={idx}
          variant={choiceParam === sort ? "link" : "ghost"}
          value={sort}
          onClick={applyQueryParams}
          className="h-8"
        >
          {sort}
        </Button>
      ))}
    </div>
  );
}

export default SearchSort;
