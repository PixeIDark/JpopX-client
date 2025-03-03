import { axiosInstance } from "@/lib/axios/instance";

const url = "users";

export const usersApi = {
  all: () => axiosInstance.get<AllResponse>(`${url}`),
  me: async () => {
    const response = await axiosInstance.get<MeResponse>(`${url}/me`);
    return response.data;
  },
};
