import React from "react";
import { StaticImageData } from "next/image";
import errorImage from "@/assets/images/src_error.png";
import notFoundImage from "@/assets/images/src_notfound.png";

interface PictureProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: StaticImageData | string;
  fallbackSrc?: StaticImageData | string;
  width?: number;
  height?: number;
}

function Picture({
  src = notFoundImage,
  alt,
  fallbackSrc = errorImage,
  width,
  height,
  ...props
}: PictureProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = typeof fallbackSrc === "string" ? fallbackSrc : fallbackSrc.src;
  };

  const imgSrc = typeof src === "string" ? src : src.src;

  return (
    <img
      src={imgSrc}
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
