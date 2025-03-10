"use client";

import React, { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import errorImage from "@/assets/images/src_error.png";
import notFoundImage from "@/assets/images/src_notfound.png";

interface PictureProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: StaticImageData | string | null;
  fallbackSrc?: StaticImageData | string;
  width?: number;
  height?: number;
}

function Picture({ src, alt, fallbackSrc = errorImage, width, height, ...props }: PictureProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    if (!src) return typeof notFoundImage === "string" ? notFoundImage : notFoundImage.src;
    return typeof src === "string" ? src : src.src;
  });

  useEffect(() => {
    if (!src) {
      setCurrentSrc(typeof notFoundImage === "string" ? notFoundImage : notFoundImage.src);
    } else {
      setCurrentSrc(typeof src === "string" ? src : src.src);
    }
  }, [src]);

  const handleError = () => {
    const fallbackSrcValue = typeof fallbackSrc === "string" ? fallbackSrc : fallbackSrc.src;
    setCurrentSrc(fallbackSrcValue);
  };

  return (
    <img
      src={currentSrc}
      alt={alt || "이미지"}
      onError={handleError}
      loading="lazy"
      width={width}
      height={height}
      {...props}
    />
  );
}

export default Picture;
