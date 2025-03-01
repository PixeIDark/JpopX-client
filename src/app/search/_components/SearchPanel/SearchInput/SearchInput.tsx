"use client";

import Input from "@/components/ui/Input";
import React, { FormEvent } from "react";
import { SearchPanelParams } from "@/types/search.type";
import { useSyncInputValue } from "@/app/search/_components/SearchPanel/SearchInput/_hooks/useSyncInputValue";

interface SearchInputProps {
  handleApplyParams: (params: SearchPanelParams) => void;
  initialText: string;
}

function SearchInput({ handleApplyParams, initialText }: SearchInputProps) {
  const inputRef = useSyncInputValue(initialText);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = inputRef.current?.value.trim() || "";
    handleApplyParams({ text });
  };

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
