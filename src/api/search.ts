import { axiosInstance } from "@/lib/axios/instance";
import { SearchRequest, SearchResponse } from "@/types/search.type";

const url = "search";

export const searchApi = async (params: SearchRequest) => {
  const response = await axiosInstance.get<SearchResponse>(url, {
    params: {
      text: params.text || "",
      searchType: params.searchType || "both",
      sort: params.sort || "popular",
      limit: params.limit || 10,
      page: params.page || 1,
    },
  });
  return response.data;
};
