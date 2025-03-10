import Button from "@/components/ui/Button";
import { useDeleteFavoriteListMutation } from "@/query/favorite-lists";

interface DeleteListProps {
  listId: number;
}

function DeleteList({ listId }: DeleteListProps) {
  const { mutate: deleteFavoriteList } = useDeleteFavoriteListMutation();

  const handleDelete = () => deleteFavoriteList(listId);

  return (
    <Button onClick={handleDelete} variant="link">
      Delete
    </Button>
  );
}

export default DeleteList;
