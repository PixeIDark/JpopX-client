import { StaticImageData } from "next/image";

export interface FavoriteList {
  id: number;
  user_id: number;
  name: string;
  order: number;
  image_url: StaticImageData | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FavoriteListSong {
  id: number;
  list_id: number;
  song_id: number;
  order: number;
  title_ko: string;
  title_ja?: string;
  title_en?: string;
  artist_ko?: string;
  artist_ja?: string;
  artist_en?: string;
  thumbnail_url: StaticImageData | null;
  tj_number?: string;
  kumyoung_number?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateFavoriteListRequest {
  name: string;
}

export interface UpdateFavoriteListRequest {
  name?: string;
  image_url?: string;
}

export interface AddSongToListRequest {
  songId: number;
}

export interface ReorderListRequest {
  userId: number;
  listId: number;
  newOrder: number;
}

export interface ReorderSongRequest {
  favoriteId: number;
  newOrder: number;
}

export type GetFavoriteListsResponse = FavoriteList[];

export interface GetFavoriteListSongsResponse {
  items: FavoriteListSong[];
}

export type CreateFavoriteListResponse = FavoriteList;

export type UpdateFavoriteListResponse = FavoriteList;

export interface DeleteFavoriteListResponse {
  message: string;
}

export interface AddSongToListResponse {
  favorite_id: number;
  message: string;
}

export interface RemoveSongFromListResponse {
  message: string;
}

export interface ReorderListResponse {
  message: string;
}

export interface ReorderSongResponse {
  message: string;
}
