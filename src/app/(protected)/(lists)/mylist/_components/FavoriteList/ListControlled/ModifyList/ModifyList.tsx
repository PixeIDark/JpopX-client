import React, { useRef } from "react";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useUpdateFavoriteListMutation } from "@/query/favorite-lists";

interface ModifyListProps {
  listId: number;
}

function ModifyList({ listId }: ModifyListProps) {
  const { mutate: updateFavoriteList } = useUpdateFavoriteListMutation(listId);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeName = () => {
    const name = inputRef.current?.value;
    if (name && name.length) {
      updateFavoriteList({ name });
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="link">Modify</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <form onSubmit={handleChangeName} className="flex flex-col gap-4">
          <h1 className="mx-auto">Change List</h1>
          <Input ref={inputRef} type="text" placeholder="New List Name" />
          <Button onClick={handleChangeName} variant="active">
            Change Name
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}

export default ModifyList;
