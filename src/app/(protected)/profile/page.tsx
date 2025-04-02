import { getServerQueryClient } from "@/lib/tanStackQuery/getServerQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProfileResult } from "@/app/(protected)/profile/_components/ProfileResult";
import { profileQueryOption } from "@/query/users/options/profileQueryOption";

async function ProfilePage() {
  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery(profileQueryOption());

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileResult />
      </HydrationBoundary>
    </div>
  );
}

export default ProfilePage;
