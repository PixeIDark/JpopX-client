"use client";

import LoginForm from "@/app/(auth)/login/_components/LoginForm";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/Toast/useToast";
import { useEffect } from "react";

function LoginPage() {
  const params = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const toastText = params.get("toast");
    if (typeof toastText === "string") {
      toast({
        title: toastText,
        message: toastText,
        type: "error",
      });
    }
  }, [params]);

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
