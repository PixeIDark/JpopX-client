import React from "react";
import Picture from "@/components/ui/Picture";
import { Save, Undo2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useProfileImage } from "@/app/(protected)/profile/_components/ProfileImage/_hooks/useProfileImage";

function ProfileImage() {
  const { data: userData } = useSession();
  const {
    selectedFile,
    previewUrl,
    fileInputRef,
    updateIsPending,
    handleFileChange,
    handleSave,
    handleUndo,
    handleImageClick,
  } = useProfileImage();

  return (
    <div className="relative w-fit">
      <button onClick={handleImageClick} disabled={updateIsPending}>
        <Picture
          src={previewUrl || userData?.user.profile_image_url}
          className="h-32 w-32 rounded-full bg-icon-stroke"
        />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={handleSave}
        disabled={updateIsPending || !selectedFile}
        className="absolute bottom-0 right-5 w-fit rounded-full border border-icon-bg"
      >
        <Save className="stroke-icon-stroke" />
      </button>
      {selectedFile && (
        <button
          onClick={handleUndo}
          className="absolute bottom-5 right-0 w-fit rounded-full border border-icon-bg"
        >
          <Undo2 className="stroke-icon-stroke" />
        </button>
      )}
    </div>
  );
}

export default ProfileImage;
