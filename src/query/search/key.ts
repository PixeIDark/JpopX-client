export const getSearchQueryKey = (params: {
  text: string;
  searchType?: "both" | "artist" | "title" | "lyrics";
  sort?: "latest" | "popular";
}) => ["search", params.text, params.searchType, params.sort];
