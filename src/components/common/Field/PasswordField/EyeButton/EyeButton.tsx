import React, { MouseEventHandler } from "react";
import { Eye, EyeOff } from "lucide-react";

interface EyeButtonProps {
  showPassword: boolean;
  togglePassword: MouseEventHandler<HTMLButtonElement>;
}

function EyeButton({ showPassword, togglePassword }: EyeButtonProps) {
  return (
    <button
      type="button"
      className="absolute right-4 top-1/2 -translate-y-1/2"
      onClick={togglePassword}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff strokeWidth={1.5} size={24} className="text-icon-stroke" />
      ) : (
        <Eye strokeWidth={1.5} size={24} className="text-icon-stroke" />
      )}
    </button>
  );
}

export default EyeButton;
