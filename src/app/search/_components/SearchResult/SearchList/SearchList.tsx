import { SearchItems } from "@/types/search.type";
import SongCard from "@/components/common/SongCard";

interface SearchListProps {
  songs: SearchItems[];
}

function SearchList({ songs }: SearchListProps) {
  return (
    <li className="flex flex-col gap-6">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </li>
  );
}

export default SearchList;
