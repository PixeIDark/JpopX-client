import { StaticImageData } from "next/image";

export type SearchType = "both" | "artist" | "title" | "lyrics";
export type Sort = "latest" | "popular";

export interface SearchRequest {
  text?: string;
  searchType?: SearchType;
  sort?: Sort;
  limit?: number;
  page?: number;
}

export type SearchPanelParams = Omit<SearchRequest, "limit" | "page">;

export interface SearchItems {
  id: number;
  song_id: number;
  title_ko: string;
  title_ja?: string;
  title_en?: string;
  artist_id: number;
  release_date?: string;
  thumbnail_url: StaticImageData | null;
  popularity_score: number;
  created_at: string;
  updated_at: string;
  artist_ko?: string;
  artist_ja?: string;
  artist_en?: string;
  romanized_ko?: string;
  tj_number?: string;
  kumyoung_number?: string;
}

export interface SearchResponse {
  items: SearchItems[];
  total: number;
  page: number;
  limit: number;
}
