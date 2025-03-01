"use client";

import Button from "@/components/ui/Button";
import { SearchPanelParams, Sort } from "@/types/search.type";
import React, { useState } from "react";

interface SearchSortProps {
  handleApplyParams: (params: SearchPanelParams) => void;
  initialSort: Sort;
}

const SORT_TYPES = ["popular", "latest"] as const;

function SearchSort({ handleApplyParams, initialSort }: SearchSortProps) {
  const [choiceSort, setChoiceSort] = useState(initialSort);

  const handleApplySort = (e: React.MouseEvent<HTMLButtonElement>) => {
    const sort = e.currentTarget.value as Sort;
    setChoiceSort(sort);
    handleApplyParams({ sort });
  };

  return (
    <div className="flex rounded-xl bg-button-ghost p-1">
      {SORT_TYPES.map((sort, idx) => (
        <Button
          key={idx}
          variant={choiceSort === sort ? "link" : "ghost"}
          value={sort}
          onClick={handleApplySort}
          className="h-8"
        >
          {sort}
        </Button>
      ))}
    </div>
  );
}

export default SearchSort;
