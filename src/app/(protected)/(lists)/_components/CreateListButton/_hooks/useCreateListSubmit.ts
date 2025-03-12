import { useCreateFavoriteListMutation } from "@/query/favorite-lists";
import { FormEvent, useRef, useState } from "react";

export function useCreateListSubmit() {
  const { mutate: createFavoriteListMutate } = useCreateFavoriteListMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = inputRef.current?.value.trim() || "";
    if (name.length > 0) {
      createFavoriteListMutate({ name });
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setDialogOpen(false);
    }
  };

  return { dialogOpen, setDialogOpen, inputRef, handleSubmit };
}
