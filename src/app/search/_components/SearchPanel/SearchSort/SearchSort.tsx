import Button from "@/components/ui/Button";
import { SearchPanelParams, Sort } from "@/types/search.type";
import React from "react";

interface SearchSortProps {
  handleApplyParams: (params: SearchPanelParams) => void;
}

function SearchSort({ handleApplyParams }: SearchSortProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const sort = e.currentTarget.value as Sort;
    handleApplyParams({ sort });
  };

  return (
    <div className="flex">
      <Button variant="link" value="latest" onClick={handleClick}>
        latest
      </Button>
      <Button variant="link" value="popular" onClick={handleClick}>
        popular
      </Button>
    </div>
  );
}

export default SearchSort;
