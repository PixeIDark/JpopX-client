import { SearchItems } from "@/types/search.type";
import Button from "@/components/ui/Button";
import Picture from "@/components/ui/Picture";
import Link from "next/link";

interface SongCardProps {
  song: SearchItems;
}

function SongCard({ song }: SongCardProps) {
  const title = song.title_ko || song.title_ja;
  const artist = song.artist_ko || song.artist_ja;

  return (
    <ul className="flex flex-row gap-1">
      <div className="h-[70px] min-w-[70px]">
        <Picture
          src={song.thumbnail_url}
          alt={`${artist}'s ${title} Image`}
          className="h-full w-full rounded-xl object-fill"
        />
      </div>
      <div className="ml-3 flex w-full flex-col justify-between">
        <h1
          className="overflow-hidden text-ellipsis whitespace-nowrap text-text-h"
          style={{ maxWidth: "calc(152px + (187 - 152) * ((100vw - 365px) / 35))" }}
        >
          {title}
        </h1>
        <p
          className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-text-p"
          style={{ maxWidth: "calc(152px + (187 - 152) * ((100vw - 365px) / 35))" }}
        >
          {artist}
        </p>
        <div className="flex gap-2 text-sm">
          <p className="w-16 text-text-tj">TJ {song.tj_number}</p>
          <p className="text-text-ky">KY {song.kumyoung_number}</p>
        </div>
      </div>
      <Button variant="ghost" className="h-8 min-w-20 max-w-20 text-sm font-medium" asChild>
        <Link href="/add-list">Add</Link>
      </Button>
    </ul>
  );
}

export default SongCard;
