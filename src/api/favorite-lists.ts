import { axiosInstance } from "@/lib/axios/instance";
import {
  AddSongToListRequest,
  AddSongToListResponse,
  CreateFavoriteListRequest,
  CreateFavoriteListResponse,
  DeleteFavoriteListResponse,
  GetFavoriteListSongsResponse,
  GetFavoriteListsResponse,
  RemoveSongFromListResponse,
  ReorderListRequest,
  ReorderListResponse,
  ReorderSongRequest,
  ReorderSongResponse,
  UpdateFavoriteListRequest,
  UpdateFavoriteListResponse,
} from "@/types/favorite-list.type";

const url = "favorites";

export const favoriteListsApi = {
  getLists: async () => {
    const response = await axiosInstance.get<GetFavoriteListsResponse>(`${url}/lists`);
    return response.data;
  },

  getListSongs: async (listId: number) => {
    const response = await axiosInstance.get<GetFavoriteListSongsResponse>(
      `${url}/lists/${listId}/songs`
    );
    return response.data;
  },

  createList: async (data: CreateFavoriteListRequest) => {
    const response = await axiosInstance.post<CreateFavoriteListResponse>(`${url}/lists`, data);
    return response.data;
  },

  updateList: async (listId: number, data: UpdateFavoriteListRequest) => {
    const response = await axiosInstance.put<UpdateFavoriteListResponse>(
      `${url}/lists/${listId}`,
      data
    );
    return response.data;
  },

  deleteList: async (listId: number) => {
    const response = await axiosInstance.delete<DeleteFavoriteListResponse>(
      `${url}/lists/${listId}`
    );
    return response.data;
  },

  reorderList: async (data: ReorderListRequest) => {
    const response = await axiosInstance.put<ReorderListResponse>(`${url}/lists/reorder`, data);
    return response.data;
  },

  addSongToList: async (listId: number, data: AddSongToListRequest) => {
    const response = await axiosInstance.post<AddSongToListResponse>(
      `${url}/lists/${listId}/songs`,
      data
    );
    return response.data;
  },

  removeSongFromList: async (favoriteId: number) => {
    const response = await axiosInstance.delete<RemoveSongFromListResponse>(
      `${url}/songs/${favoriteId}`
    );
    return response.data;
  },

  reorderSong: async (data: ReorderSongRequest) => {
    const response = await axiosInstance.put<ReorderSongResponse>(`${url}/songs/reorder`, data);
    return response.data;
  },
};
