import React from "react";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { StaticImageData } from "next/image";
import Picture from "@/components/ui/Picture";
import { useModifyList } from "@/app/(protected)/(lists)/mylist/_components/FavoriteList/ListControlled/ModifyList/_hooks/useModifyList";

interface ModifyListProps {
  listId: number;
  listName: string;
  image: StaticImageData | string | null;
  onClose: () => void;
}

function ModifyList({ listId, image, listName, onClose }: ModifyListProps) {
  const { handleImageClick, handleFileChange, handleSubmit, previewUrl, fileInputRef, inputRef } =
    useModifyList({
      listId,
      image,
      onClose,
    });

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="link">Modify</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="mx-auto">Change List</h1>
          <button type="button" className="mx-auto" onClick={handleImageClick}>
            <Picture
              src={previewUrl || image}
              alt="리스트 이미지"
              className="h-[200] w-[200] rounded-lg"
            />
            <p className="text-text-p">이미지 변경</p>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Input ref={inputRef} type="text" defaultValue={listName} />
          <div className="mx-auto w-32">
            <Button type="submit" variant="active">
              Save
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}

export default ModifyList;
