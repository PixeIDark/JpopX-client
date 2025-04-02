import { useQuery } from "@tanstack/react-query";
import { getProfileKey } from "@/query/users/key";
import { usersApi } from "@/api/users";

export function useProfileQuery() {
  return useQuery({
    queryKey: getProfileKey(),
    queryFn: () => usersApi.me(),
  });
}
