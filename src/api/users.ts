import { axiosInstance } from "@/lib/axios/instance";

const url = "users";

export const usersApi = {
  all: () => axiosInstance.get<AllResponse>(`${url}`),
  me: () => axiosInstance.get<MeResponse>(`${url}/me`),
};
