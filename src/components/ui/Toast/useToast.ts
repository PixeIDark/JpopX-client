import { useContext } from "react";
import { ToastContext } from "./ToastContext";
import { ToastType } from "./Toast";

interface ToastOptions {
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

export function useToast() {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { toast: showToast, removeToast } = context;

  const toast = Object.assign((options: ToastOptions) => showToast(options), {
    success: (message: string, title?: string, duration?: number) =>
      showToast({ message, title, type: "success", duration }),
    error: (message: string, title?: string, duration?: number) =>
      showToast({ message, title, type: "error", duration }),
    dismiss: (id: string) => removeToast(id),
  });

  return { toast };
}
