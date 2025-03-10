import { useUpdateImageMutation } from "@/query/users";
import React, { useRef, useState } from "react";

export function useProfileImage() {
  const { mutate: updateImage, isPending: updateIsPending } = useUpdateImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSave = () => {
    if (selectedFile) {
      updateImage({
        file: selectedFile,
      });
    }
    setSelectedFile(null);
  };

  const handleUndo = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    selectedFile,
    previewUrl,
    fileInputRef,
    updateIsPending,
    handleImageClick,
    handleFileChange,
    handleSave,
    handleUndo,
  };
}
