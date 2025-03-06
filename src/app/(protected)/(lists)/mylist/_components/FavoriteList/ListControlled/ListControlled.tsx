"use client";

import { EllipsisVertical } from "lucide-react";
import Sheet from "@/components/ui/Sheet";
import Button from "@/components/ui/Button";
import {
  useDeleteFavoriteListMutation,
  useUpdateFavoriteListMutation,
} from "@/query/favorite-lists";
import Dialog from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import { useRef } from "react";

interface ListControlledProps {
  listId: number;
}

function ListControlled({ listId }: ListControlledProps) {
  const { mutate: deleteFavoriteList } = useDeleteFavoriteListMutation();
  const { mutate: updateFavoriteList } = useUpdateFavoriteListMutation(listId);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = () => deleteFavoriteList(listId);

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
    <Sheet>
      <Sheet.Trigger className="p-2">
        <EllipsisVertical width={24} height={24} />
      </Sheet.Trigger>
      <Sheet.Content>
        <div className="flex flex-col">
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
          <Button onClick={handleDelete} variant="link">
            Delete
          </Button>
        </div>
      </Sheet.Content>
    </Sheet>
  );
}

export default ListControlled;
