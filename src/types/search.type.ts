export interface SearchRequest {
  text?: string;
  searchType?: "both" | "artist" | "title" | "lyrics";
  sort?: "latest" | "popular";
  limit?: number;
  page?: number;
}

export interface SearchResponse {
  items: {
    id: number;
    song_id: number;
    title_ko: string;
    title_ja?: string;
    title_en?: string;
    artist_id: number;
    release_date?: string;
    thumbnail_url?: string;
    popularity_score: number;
    created_at: string;
    updated_at: string;
    artist_ko?: string;
    artist_ja?: string;
    artist_en?: string;
    romanized_ko?: string;
    tj_number?: string;
    kumyoung_number?: string;
  }[];
  total: number;
  page: number;
  limit: number;
}
