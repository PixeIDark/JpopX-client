import { SearchItems } from "@/types/search.type";
import Picture from "@/components/ui/Picture";
import AddSongToListButton from "@/components/common/SongCard/AddSongToListButton";
import { songProcessor } from "@/utils/services/songProcessor";

interface SongCardProps {
  song: SearchItems;
}

const maxContainerWidth = 512;
const limitWidth = 152 + (187 - 152) * ((maxContainerWidth - 365) / 35);
const textMaxWidth = `min(calc(152px + (187 - 152) * ((100vw - 365px) / 35)), ${limitWidth}px)`;

function SongCard({ song }: SongCardProps) {
  const { title, artist, tjNumber, kyNumber } = songProcessor(song);

  return (
    <ul className="flex flex-row gap-1">
      <div className="h-[70px] min-w-[70px]">
        <Picture
          src={song.thumbnail_url}
          alt={`${artist}'s ${title} Image`}
          className="h-[70px] w-[70px] rounded-xl object-fill"
        />
      </div>
      <div className="ml-3 flex w-full flex-col justify-between">
        <h1
          className="overflow-hidden text-ellipsis whitespace-nowrap text-text-h"
          style={{ maxWidth: textMaxWidth }}
        >
          {title}
        </h1>
        <p
          className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-text-p"
          style={{ maxWidth: textMaxWidth }}
        >
          {artist}
        </p>
        <div className="flex gap-2 text-sm">
          <p className="w-16 text-text-tj">TJ {tjNumber}</p>
          <p className="text-text-ky">KY {kyNumber}</p>
        </div>
      </div>
      <AddSongToListButton songId={song.song_id} />
    </ul>
  );
}

export default SongCard;
