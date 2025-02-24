"use client";

import { FieldError, Path, UseFormRegister } from "react-hook-form";
import Input from "@/components/ui/Input";
import ErrorMessage from "@/components/common/Field/ErrorMessage";

interface TextFieldProps<T extends Record<string, any>> {
  id: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
}

function TextField<T extends Record<string, any>>({
  id,
  name,
  type = "text",
  placeholder,
  register,
  error,
  className,
}: TextFieldProps<T>) {
  return (
    <div className={className}>
      <label htmlFor={id} />
      <Input id={id} type={type} placeholder={placeholder} {...register(name)} />
      <ErrorMessage error={error} />
    </div>
  );
}

export default TextField;
