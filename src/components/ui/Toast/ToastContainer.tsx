import Toast from "./Toast";
import { ToastItem } from "./ToastContext";

interface ToastContainerProps {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed inset-x-0 bottom-20 z-50 flex flex-col" aria-live="polite">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}

export default ToastContainer;
