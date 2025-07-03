"use client";

import Input from "@/components/ui/Input";
import { useQueryInput } from "@/hooks/useQueryInput";
import SearchIcon from "@/assets/icons/search/search.svg";

interface SearchInputProps {
  initialText: string;
}

function SearchInput({ initialText }: SearchInputProps) {
  const { handleSubmit, inputRef } = useQueryInput(initialText, "text");

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Input
        placeholder="Please Enter Something"
        ref={inputRef}
        type="text"
        defaultValue={initialText}
      />
      <button onClick={handleSubmit} className="absolute right-4 top-1/2 -translate-y-1/2">
        <SearchIcon width="24" height="24" className="fill-icon-stroke" />
      </button>
    </form>
  );
}

export default SearchInput;
