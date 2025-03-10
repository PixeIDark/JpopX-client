import React, { createContext, useContext, useEffect, useState } from "react";
import { X } from "lucide-react";

type DialogContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const initialDialogContext: DialogContextType = {
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
};

const DialogContext = createContext(initialDialogContext);
const useDialogContext = () => useContext(DialogContext);

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Dialog({ children, open, onOpenChange }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  useEffect(() => {
    if (isControlled) {
      setInternalOpen(open);
    }
  }, [isControlled, open]);

  const handleOpen = () => {
    if (!isControlled) {
      setInternalOpen(true);
    }
    onOpenChange?.(true);
  };

  const handleClose = () => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  };

  const value = {
    isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
  };

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

interface TriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

function Trigger({ children, className, asChild = false, ...props }: TriggerProps) {
  const { onOpen } = useDialogContext();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: onOpen,
      ...props,
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <button className={className} onClick={onOpen} {...props}>
      {children}
    </button>
  );
}

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

function Content({ children, className }: ContentProps) {
  const { isOpen, onClose } = useDialogContext();

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOutClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      onClick={handleOutClose}
    >
      <div className={`${className || ""} relative w-full max-w-md rounded-xl bg-body-default p-4`}>
        <div>{children}</div>
        <button onClick={onClose} className="absolute right-4 top-4" aria-label="닫기">
          <X className="stroke-icon-stroke" />
        </button>
      </div>
    </div>
  );
}

Dialog.Trigger = Trigger;
Dialog.Content = Content;
export default Dialog;
