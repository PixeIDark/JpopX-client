import Button from "@/components/ui/Button";
import { useDeleteFavoriteListMutation } from "@/query/favorite-lists";

interface DeleteListProps {
  listId: number;
  onClose: () => void;
}

function DeleteList({ listId, onClose }: DeleteListProps) {
  const { mutate: deleteFavoriteList } = useDeleteFavoriteListMutation();

  const handleDelete = () => {
    deleteFavoriteList(listId);
    onClose();
  };

  return (
    <Button onClick={handleDelete} variant="link">
      Delete
    </Button>
  );
}

export default DeleteList;
