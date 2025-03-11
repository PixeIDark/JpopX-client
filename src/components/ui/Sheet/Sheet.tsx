import React, { createContext, useContext, useEffect, useState } from "react";
import { Minus } from "lucide-react";

const initialValues = {
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
};

const SheetContext = createContext(initialValues);
const useSheetContext = () => useContext(SheetContext);

interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Sheet({ children, open, onOpenChange }: SheetProps) {
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

  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
}

interface TriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

function Trigger({ children, asChild = false, className = "", ...props }: TriggerProps) {
  const { onOpen } = useSheetContext();

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

function Content({ children, className = "" }: ContentProps) {
  const { isOpen, onClose } = useSheetContext();

  if (!isOpen) return null;

  const handleOutClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={handleOutClose}>
      <div
        className={`${className} absolute inset-x-0 bottom-0 mx-auto w-full max-w-md rounded-xl bg-body-default p-4`}
      >
        <button onClick={onClose} className="absolute inset-x-0 top-0" aria-label="닫기">
          <Minus className="mx-auto stroke-button-ghost" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

Sheet.Trigger = Trigger;
Sheet.Content = Content;
export default Sheet;
