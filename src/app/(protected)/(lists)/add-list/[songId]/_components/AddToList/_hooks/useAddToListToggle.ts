import { useAddSongToListMutation, useRemoveSongFromListMutation } from "@/query/favorite-lists";
import { useState } from "react";

export function useAddToListToggle(listId: number, songId: number) {
  const { mutateAsync: addSongToListMutate } = useAddSongToListMutation(listId);
  const { mutate: removeSongFromListMutate } = useRemoveSongFromListMutation(listId);
  const [isChecked, setIsChecked] = useState(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);

  const handleAddSongToList = async () => {
    const data = await addSongToListMutate({ songId });
    setFavoriteId(data.favorite_id);
    setIsChecked(true);
  };

  const handleRemoveSongFromList = () => {
    if (!favoriteId) return;
    removeSongFromListMutate(favoriteId);
    setFavoriteId(null);
    setIsChecked(false);
  };

  const handleToggle = () => {
    if (!isChecked) handleAddSongToList();
    else handleRemoveSongFromList();
  };

  return { isChecked, handleToggle };
}
