"use client";

import { EllipsisVertical } from "lucide-react";
import Sheet from "@/components/ui/Sheet";
import ModifyList from "@/app/(protected)/(lists)/mylist/_components/FavoriteList/ListControlled/ModifyList";
import DeleteList from "@/app/(protected)/(lists)/mylist/_components/FavoriteList/ListControlled/DeleteList";

interface ListControlledProps {
  listId: number;
}

function ListControlled({ listId }: ListControlledProps) {
  return (
    <Sheet>
      <Sheet.Trigger className="p-2">
        <EllipsisVertical width={24} height={24} />
      </Sheet.Trigger>
      <Sheet.Content>
        <div className="flex flex-col">
          <ModifyList listId={listId} />
          <DeleteList listId={listId} />
        </div>
      </Sheet.Content>
    </Sheet>
  );
}

export default ListControlled;
