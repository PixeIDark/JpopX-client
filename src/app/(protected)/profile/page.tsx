"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useLogoutMutation } from "@/query/auth/mutations/useLogoutMutation";
import { useDeleteAccountMutation } from "@/query/users/mutations/useDeleteAccountMutation";
import ProfileImage from "@/app/(protected)/profile/_components/ProfileImage";
import { useProfileQuery } from "@/query/users/queries/useProfileQuery";

function ProfilePage() {
  // 리액트 쿼리로 바꿔라.. 존나 짜친다.
  const { data: userData } = useProfileQuery();
  const { mutate: logoutMutate, isPending: logoutIsPending } = useLogoutMutation();
  const { mutate: deleteAccount, isPending: deleteAccountIsPending } = useDeleteAccountMutation();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 py-4">
        <ProfileImage />
        <div>
          <h1 className="text-xl font-medium text-text-h">{userData?.name}</h1>
          <p className="font-light text-text-p">{userData?.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Button variant="ghost" asChild>
          <Link href="/profile/verification/name">Change Name</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/profile/verification/password">Change Password</Link>
        </Button>
        <Button
          onClick={() => logoutMutate()}
          disabled={logoutIsPending}
          isPending={logoutIsPending}
          variant="outline"
        >
          Log Out
        </Button>
        <Button
          onClick={() => deleteAccount()}
          disabled={deleteAccountIsPending}
          isPending={deleteAccountIsPending}
          variant="error"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;
