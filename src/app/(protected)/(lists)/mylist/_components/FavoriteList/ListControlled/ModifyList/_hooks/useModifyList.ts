import { useUpdateFavoriteListMutation } from "@/query/favorite-lists";
import React, { useRef, useState } from "react";
import { StaticImageData } from "next/image";

interface ModifyListProps {
  listId: number;
  image: StaticImageData | string | null;
  onClose: () => void;
}

export function useModifyList({ listId, image, onClose }: ModifyListProps) {
  const { mutate: updateFavoriteList } = useUpdateFavoriteListMutation(listId);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);

      setSelectedFile(file);
      setPreviewUrl(newPreviewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onClose();

    const name = inputRef.current?.value;
    if (!name || !name.length) return;

    const tempImageUrl = selectedFile ? URL.createObjectURL(selectedFile) : image;

    updateFavoriteList({
      name,
      image_url: tempImageUrl,
      isOptimistic: true,
      file: selectedFile,
    });
  };

  return { handleImageClick, handleFileChange, handleSubmit, previewUrl, fileInputRef, inputRef };
}
