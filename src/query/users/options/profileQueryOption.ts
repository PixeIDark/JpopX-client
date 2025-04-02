import { queryOptions } from "@tanstack/react-query";
import { usersApi } from "@/api/users";
import { getProfileKey } from "@/query/users/key";

export function profileQueryOption() {
  return queryOptions({
    queryKey: getProfileKey(),
    queryFn: () => usersApi.me(),
  });
}
