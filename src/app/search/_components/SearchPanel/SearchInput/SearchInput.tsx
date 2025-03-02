"use client";

import Input from "@/components/ui/Input";
import { useQueryInput } from "@/hooks/useQueryInput";

interface SearchInputProps {
  initialText: string;
}

function SearchInput({ initialText }: SearchInputProps) {
  const { handleSubmit, inputRef } = useQueryInput(initialText, "text");

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        placeholder="검색어를 입력하세요"
        ref={inputRef}
        type="text"
        defaultValue={initialText}
      />
    </form>
  );
}

export default SearchInput;
