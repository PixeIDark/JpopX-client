"use client";

import React from "react";
import { useToast } from "@/components/ui/Toast/useToast";
import Button from "@/components/ui/Button";
import Link from "next/link";
import FuckAccessToken from "@/app/test/_components/test/FuckAccessToken";
import GetMe from "@/app/test/_components/test/GetMe";
import LogoutMe from "@/app/test/_components/test/LogoutMe";

function TestPage() {
  const { toast } = useToast();

  const handleButtonClick = () => {
    toast({
      title: "알림",
      message: "작업이 완료되었습니다!",
      type: "error",
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Button>outline</Button>
      <Button variant="link">link</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="active" onClick={handleButtonClick}>
        active
      </Button>
      <Button variant="error" asChild>
        <Link href="/search">go to page Search</Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/login">go to page Login</Link>
      </Button>
      <FuckAccessToken />
      <GetMe />
      <LogoutMe />
    </div>
  );
}

export default TestPage;
