import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { SearchPanelParams, SearchType } from "@/types/search.type";

interface SearchFilterProps {
  handleApplyParams: (params: SearchPanelParams) => void;
  initialSearchType: SearchType;
}

const SEARCH_TYPES = ["both", "title", "artist"] as const;

function SearchFilter({ handleApplyParams, initialSearchType }: SearchFilterProps) {
  const [choiceType, setChoiceType] = useState(initialSearchType);

  const handleApplyType = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const searchType = e.currentTarget.value as SearchType;
    setChoiceType(searchType);
    handleApplyParams({ searchType });
  };

  return (
    <div className="flex gap-3">
      {SEARCH_TYPES.map((type, idx) => (
        <Button
          key={idx}
          variant={choiceType === type ? "outline" : "ghost"}
          value={type}
          onClick={handleApplyType}
          className="h-11 max-w-[70px] text-sm"
        >
          {type}
        </Button>
      ))}
    </div>
  );
}

export default SearchFilter;
