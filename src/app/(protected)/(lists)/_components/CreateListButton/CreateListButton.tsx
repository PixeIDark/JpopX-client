"use client";

import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import { useCreateListSubmit } from "@/app/(protected)/(lists)/_components/CreateListButton/_hooks/useCreateListSubmit";

interface CreateListButtonProps {
  isLists?: boolean;
}

function CreateListButton({ isLists }: CreateListButtonProps) {
  const { dialogOpen, setDialogOpen, inputRef, handleSubmit } = useCreateListSubmit(isLists);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger asChild>
        <div className="sticky inset-x-0 bottom-0 mx-auto max-w-[calc(32rem-32px)] bg-body-default py-3">
          <Button variant="active">Create New List</Button>
        </div>
      </Dialog.Trigger>
      <Dialog.Content>
        <form onClick={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-center">List Name</h1>
          <Input ref={inputRef} type="text" placeholder="Please Write" />
          <div className="mx-auto w-32">
            <Button variant="active">Create</Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}

export default CreateListButton;
