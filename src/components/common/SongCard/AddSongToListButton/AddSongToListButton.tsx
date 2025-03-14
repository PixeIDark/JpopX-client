"use client";

import Button from "@/components/ui/Button";
import { useAddSongToListButton } from "@/components/common/SongCard/AddSongToListButton/_hooks/useAddSongToListButton";

interface AddSongToListButtonProps {
  songId: number;
}

function AddSongToListButton({ songId }: AddSongToListButtonProps) {
  const { handlePathToRightPage } = useAddSongToListButton(songId);

  return (
    <Button
      onClick={handlePathToRightPage}
      variant="ghost"
      className="h-8 min-w-20 max-w-20 text-sm font-medium"
    >
      Add
    </Button>
  );
}

export default AddSongToListButton;
