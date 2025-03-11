import { axiosInstance } from "@/lib/axios/instance";
import { AllResponse, MeModifyRequest, MeModifyResponse, MeResponse } from "@/types/users.type";

const url = "users";

export const usersApi = {
  all: () => axiosInstance.get<AllResponse>(`${url}`),

  me: async () => {
    const response = await axiosInstance.get<MeResponse>(`${url}/me`);
    return response.data;
  },

  modify: async (data: MeModifyRequest) => {
    if (!data) return;

    const response = await axiosInstance.put<MeModifyResponse>(`${url}/me`, data);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await axiosInstance.delete(`${url}/me`);
    return response.data;
  },
};
