import { getIsomorphicSession } from "@/utils/helpers/getIsomorphicSession";

export const hasSessionExpired = async () => {
  const session = await getIsomorphicSession();

  return (session?.refreshTokenExpires ?? 0) > Date.now();
};
