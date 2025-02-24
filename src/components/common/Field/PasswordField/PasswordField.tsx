"use client";

import Input from "@/components/ui/Input";
import { FieldError, Path, UseFormRegister } from "react-hook-form";
import ErrorMessage from "@/components/common/Field/ErrorMessage";
import { useInvisiblePassword } from "@/components/common/Field/PasswordField/hooks/useInvisiblePassword";
import EyeButton from "@/components/common/Field/PasswordField/EyeButton";

interface PasswordFieldProps<T extends Record<string, any>> {
  id?: string;
  name: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
}

function PasswordField<T extends Record<string, any>>({
  id = "password",
  name,
  placeholder = "Password",
  register,
  error,
  className,
}: PasswordFieldProps<T>) {
  const { showPassword, togglePassword } = useInvisiblePassword();

  return (
    <div>
      <div className={`relative ${className || ""}`}>
        <label htmlFor={id} />
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(name)}
        />
        <EyeButton showPassword={showPassword} togglePassword={togglePassword} />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
}

export default PasswordField;
