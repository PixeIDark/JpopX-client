import { getServerQueryClient } from "@/lib/tanStackQuery/getServerQueryClient";
import { favoriteListSongsOption } from "@/query/favorite-lists/options/favoritListSongsOption";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import FavoriteSongList from "@/app/(protected)/(lists)/mylist/[listId]/_components/FavoriteSongList";

async function ListIdPage({ params }: { params: Promise<{ listId: string }> }) {
  const { listId } = await params;
  const parsedListId = parseInt(listId);

  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery(favoriteListSongsOption(parsedListId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FavoriteSongList listId={parsedListId} />
    </HydrationBoundary>
  );
}

export default ListIdPage;
