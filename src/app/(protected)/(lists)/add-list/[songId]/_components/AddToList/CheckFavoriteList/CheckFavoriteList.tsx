"use client";

import { Circle } from "lucide-react";

interface CheckFavoriteListProps {
  isChecked: boolean;
}

function CheckFavoriteList({ isChecked }: CheckFavoriteListProps) {
  return (
    <>
      {!isChecked ? (
        <Circle strokeWidth={1.5} className="stroke-icon-stroke" />
      ) : (
        <Circle strokeWidth={1.5} className="fill-icon-bg stroke-icon-stroke" />
      )}
    </>
  );
}

export default CheckFavoriteList;
