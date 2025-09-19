import { getSearchQueryKey } from "@/query/search";
import { searchApi } from "@/api/search";
import { queryOptions } from "@tanstack/react-query";
import { SearchPanelParams } from "@/types/search.type";

export const searchQueryOption = (params: SearchPanelParams) =>
  queryOptions({
    queryKey: getSearchQueryKey({
      text: params.text || "",
      searchType: params.searchType || "both",
      sort: params.sort || "popular",
    }),
    queryFn: () =>
      searchApi({
        text: params.text,
        searchType: params.searchType,
        sort: params.sort,
        page: params.page,
        limit: params.limit,
      }),
  });
