import { SearchItems } from "@/types/search.type";
import { FavoriteListSong } from "@/types/favorite-list.type";

export const songProcessor = (song: FavoriteListSong | SearchItems) => {
  return {
    title: songTitleProcessor(song.title_ko, song.title_ja),
    artist: songArtistProcessor(song.artist_ko, song.artist_ja),
    tjNumber: songTjNumberProcessor(song.tj_number),
    kyNumber: songKyNumberProcessor(song.kumyoung_number),
  };
};

export const songTitleProcessor = (titleKo?: string, titleJa?: string) => titleKo || titleJa || "@";

export const songArtistProcessor = (artistKo?: string, artistJa?: string) =>
  artistKo || artistJa || "@";

export const songTjNumberProcessor = (tjNumber?: string) => tjNumber || "-";

export const songKyNumberProcessor = (kyNumber?: string) => kyNumber || "-";
