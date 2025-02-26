"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const TOAST_LIFETIME = 3 * 1000;

const styles = {
  success: "border-l-button-active text-button-active",
  error: "border-l-button-error text-button-error",
} as const;

export type ToastType = "success" | "error";

export interface ToastProps {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

function Toast({
  id,
  title,
  message,
  type = "success",
  duration = TOAST_LIFETIME,
  onClose,
}: ToastProps) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={`${styles[type]} animate-fadeIn border-1 mb-2 flex min-w-80 max-w-md items-start justify-between rounded-md border-l-4 border-stroke-default bg-body-default p-4 shadow-md`}
      role="alert"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseUp={() => onClose(id)}
    >
      <div>
        {title && <h1 className="font-bold">{title}</h1>}
        <p className="text-sm text-text-p">{message}</p>
      </div>
      {isHovered && (
        <button
          className="absolute right-2 top-2 transition-opacity duration-200 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation(); // 클릭 이벤트가 상위로 전파되는 것을 방지
            onClose(id);
          }}
          aria-label="닫기"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default Toast;
