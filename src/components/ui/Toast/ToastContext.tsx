"use client";

import React, { createContext, ReactNode, useCallback, useState } from "react";
import ToastContainer from "./ToastContainer";
import { ToastType } from "./Toast";
import { generateUUID } from "@/utils/generateUUID";

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
}

function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback(
    (options: Omit<ToastItem, "id">) => {
      const newToast = {
        id: generateUUID(),
        ...options,
      };

      setToasts((prevToasts) => {
        const updatedToasts = [...prevToasts, newToast];
        if (updatedToasts.length > maxToasts) {
          return updatedToasts.slice(updatedToasts.length - maxToasts);
        }
        return updatedToasts;
      });

      return newToast.id;
    },
    [maxToasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
