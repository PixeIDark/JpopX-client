import { useSuspenseQuery } from "@tanstack/react-query";
import { usersApi } from "@/api/users";
import { getProfileKey } from "@/query/users/key";

export function useProfileQuery() {
  return useSuspenseQuery({
    queryKey: getProfileKey(),
    queryFn: () => usersApi.me(),
  });
}
