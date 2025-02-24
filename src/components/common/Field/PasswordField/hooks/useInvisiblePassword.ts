import { useState } from "react";

export function useInvisiblePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return { showPassword, togglePassword };
}
