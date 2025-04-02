"use client";

import { useProfileQuery } from "@/query/users";
import ProfileImage from "@/app/(protected)/profile/_components/ProfileResult/ProfileImage";
import { ProfileButtons } from "@/app/(protected)/profile/_components/ProfileResult/ProfileButtons";

function ProfileResult() {
  const { data: userData } = useProfileQuery();

  if (!userData) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 py-4">
        <ProfileImage profileImage={userData.profile_image_url} />
        <div>
          <h1 className="text-xl font-medium text-text-h">{userData.name}</h1>
          <p className="font-light text-text-p">{userData.email}</p>
        </div>
      </div>
      <ProfileButtons />
    </div>
  );
}

export default ProfileResult;
