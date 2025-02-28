"use client";

import Input from "@/components/ui/Input";
import React, { FormEvent, useRef } from "react";
import { SearchPanelParams } from "@/types/search.type";

interface SearchInputProps {
  handleApplyParams: (params: SearchPanelParams) => void;
}

function SearchInput({ handleApplyParams }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = inputRef.current?.value.trim() || "";
    handleApplyParams({ text });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input placeholder="서치인풋" ref={inputRef} type="text" />
    </form>
  );
}

export default SearchInput;
