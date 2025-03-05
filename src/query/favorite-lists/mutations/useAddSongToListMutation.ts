import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteListsApi } from "@/api/favorite-lists";
import { AddSongToListRequest } from "@/types/favorite-list.type";
import { useToast } from "@/components/ui/Toast/useToast";
import { getFavoriteListSongsKey } from "@/query/favorite-lists";
import axios, { AxiosError } from "axios";

export function useAddSongToListMutation(listId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: AddSongToListRequest) => favoriteListsApi.addSongToList(listId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: getFavoriteListSongsKey(listId) });
      toast({
        title: "Song Added To List Successfully",
        message: data.message,
        type: "success",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{
          message: string;
          error: string;
          statusCode: number;
        }>;
        const axiosErrorMessage = axiosError.response?.data?.message;

        toast({
          title: "Error",
          message: axiosErrorMessage || error.message,
          type: "error",
        });
      } else {
        // 일반 에러인 경우
        toast({
          title: "Error",
          message: error instanceof Error ? error.message : "Failed To Add Song To List",
          type: "error",
        });
      }
    },
  });
}
