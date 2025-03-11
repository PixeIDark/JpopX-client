import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";
import { DEFAULT_QUERY_OPTIONS } from "./queryConfig";

export function getServerQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        ...DEFAULT_QUERY_OPTIONS,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}
