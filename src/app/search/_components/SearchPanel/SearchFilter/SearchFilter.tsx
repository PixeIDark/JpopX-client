import Button from "@/components/ui/Button";
import React from "react";
import { SearchPanelParams, SearchType } from "@/types/search.type";

interface SearchFilterProps {
  handleApplyParams: (params: SearchPanelParams) => void;
}

const SEARCH_TYPES = ["both", "title", "artist"];

function SearchFilter({ handleApplyParams }: SearchFilterProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const searchType = e.currentTarget.value as SearchType;
    handleApplyParams({ searchType });
  };

  return (
    <div className="flex gap-3 py-4">
      {SEARCH_TYPES.map((type, idx) => (
        <Button
          key={idx}
          variant="outline"
          value={type}
          onClick={handleClick}
          className="h-11 w-auto px-4 text-sm"
        >
          {type}
        </Button>
      ))}
    </div>
  );
}

export default SearchFilter;
