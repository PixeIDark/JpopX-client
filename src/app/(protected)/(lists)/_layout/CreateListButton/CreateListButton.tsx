"use client";

import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import { useCreateListSubmit } from "@/app/(protected)/(lists)/_layout/CreateListButton/_hooks/useCreateListSubmit";

function CreateListButton() {
  const { dialogOpen, setDialogOpen, inputRef, handleSubmit } = useCreateListSubmit();

  return (
    <div className="fixed bottom-[77px] left-0 right-0 px-4 pb-3">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger asChild>
          <Button variant="active">Create New List</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <form onClick={handleSubmit} className="flex flex-col gap-4">
            <h1 className="text-center">List Name</h1>
            <Input ref={inputRef} type="text" placeholder="Please Write" />
            <Button variant="active" className="mx-auto h-[40] w-32">
              Create
            </Button>
          </form>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

export default CreateListButton;
