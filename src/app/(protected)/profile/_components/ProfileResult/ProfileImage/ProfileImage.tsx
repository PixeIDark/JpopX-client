import Picture from "@/components/ui/Picture";
import { Check, X } from "lucide-react";
import { useProfileImage } from "@/app/(protected)/profile/_components/ProfileResult/ProfileImage/_hooks/useProfileImage";

interface ProfileImageProps {
  profileImage: string;
}

function ProfileImage({ profileImage }: ProfileImageProps) {
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
          src={previewUrl || profileImage}
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
      {selectedFile && (
        <button
          onClick={handleSave}
          disabled={updateIsPending || !selectedFile}
          className="bg-icon-check absolute bottom-0 right-5 w-fit rounded-full"
        >
          <Check className="stroke-white" />
        </button>
      )}
      {selectedFile && (
        <button
          onClick={handleUndo}
          className="bg-icon-close absolute bottom-5 right-0 w-fit rounded-full"
        >
          <X className="stroke-white" />
        </button>
      )}
    </div>
  );
}

export default ProfileImage;
