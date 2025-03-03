import React from "react";
import Button from "@/components/ui/Button";

async function ListsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <div className="overflow-y-auto">{children}</div>
      <Button variant="active">Create New List</Button>
    </div>
  );
}

export default ListsLayout;
