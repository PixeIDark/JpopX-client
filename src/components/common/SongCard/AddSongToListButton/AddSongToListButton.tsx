"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { createCallbackUrl } from "@/utils/createCallbackUrl";

interface AddSongToListButtonProps {
  songId: number;
}

function AddSongToListButton({ songId }: AddSongToListButtonProps) {
  const { status } = useSession();

  const path =
    status === "authenticated" ? `/add-list/${songId}` : createCallbackUrl(`/add-list/${songId}`);

  return (
    <Button variant="ghost" className="h-8 min-w-20 max-w-20 text-sm font-medium" asChild>
      <Link href={path}>Add</Link>
    </Button>
  );
}

export default AddSongToListButton;
