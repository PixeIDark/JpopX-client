"use client";

import React, { useState } from "react";
import { StaticImageData } from "next/image";
import errorImage from "@/assets/images/src_error.png";
import notFoundImage from "@/assets/images/src_notfound.png";

interface PictureProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: StaticImageData | string | null;
  fallbackSrc?: StaticImageData;
  width?: number;
  height?: number;
}

function Picture({ src, alt, fallbackSrc = errorImage, width, height, ...props }: PictureProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    if (!src) return notFoundImage.src;
    return typeof src === "string" ? src : src.src;
  });

  const handleError = () => {
    setCurrentSrc(fallbackSrc.src);
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      loading="lazy"
      width={width}
      height={height}
      {...props}
    />
  );
}

export default Picture;
