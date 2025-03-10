import React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={`${className || ""} flex h-14 w-full items-center justify-center rounded-xl bg-input-input p-4 text-base text-text-h placeholder:text-text-p focus:outline-none focus:ring-1 focus:ring-solid-default`}
      {...props}
    />
  );
}

export default Input;
