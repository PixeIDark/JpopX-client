"use client";

import { EllipsisVertical } from "lucide-react";
import Sheet from "@/components/ui/Sheet";
import ModifyList from "@/app/(protected)/(lists)/mylist/_components/FavoriteList/ListControlled/ModifyList";
import DeleteList from "@/app/(protected)/(lists)/mylist/_components/FavoriteList/ListControlled/DeleteList";
import { StaticImageData } from "next/image";
import { useState } from "react";

interface ListControlledProps {
  listId: number;
  listName: string;
  image: StaticImageData | string | null;
}

function ListControlled({ listId, image, listName }: ListControlledProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Sheet.Trigger className="p-2">
        <EllipsisVertical width={24} height={24} />
      </Sheet.Trigger>
      <Sheet.Content>
        <div className="flex flex-col">
          <ModifyList listId={listId} image={image} listName={listName} onClose={handleClose} />
          <DeleteList listId={listId} onClose={handleClose} />
        </div>
      </Sheet.Content>
    </Sheet>
  );
}

export default ListControlled;
