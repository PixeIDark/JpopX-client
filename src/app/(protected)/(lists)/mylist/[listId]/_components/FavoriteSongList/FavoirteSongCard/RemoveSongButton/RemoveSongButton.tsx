import { useRemoveSongFromListMutation } from "@/query/favorite-lists";
import Button from "@/components/ui/Button";

interface RemoveSongButtonProps {
  listId: number;
  favoriteId: number;
}

function RemoveSongButton({ listId, favoriteId }: RemoveSongButtonProps) {
  const { mutate: removeSongFromListMutate } = useRemoveSongFromListMutation(listId);

  const handleRemoveSong = () => removeSongFromListMutate(favoriteId);

  return (
    <Button
      onClick={handleRemoveSong}
      variant="ghost"
      className="h-8 min-w-20 max-w-20 text-sm font-medium"
    >
      Remove
    </Button>
  );
}

export default RemoveSongButton;
