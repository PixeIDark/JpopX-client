import { axiosInstance } from "@/lib/axios/instance";
import { SearchRequest, SearchResponse } from "@/types/search.type";

const url = "search";

export const searchApi = (params: SearchRequest) =>
  axiosInstance.get<SearchResponse>(url, {
    params: {
      text: params.text || "",
      searchType: params.searchType || "both",
      sort: params.sort || "popular",
      limit: params.limit || 20,
      page: params.page || 1,
    },
  });
