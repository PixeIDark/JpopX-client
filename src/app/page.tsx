"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast/useToast";
import FuckAccessToken from "@/app/_components/FuckAccessToken";
import GetMe from "@/app/_components/GetMe";
import LogoutMe from "@/app/_components/LogoutMe";

function HomePage() {
  const { toast } = useToast();

  const handleButtonClick = () => {
    toast({
      title: "알림",
      message: "작업이 완료되었습니다!",
      type: "error",
    });
  };

  return (
    <div>
      <Button>outline</Button>
      <Button variant="link">link</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="active" onClick={handleButtonClick}>
        active
      </Button>
      <Button variant="error" asChild>
        <Link href="/login">go to page</Link>
      </Button>
      <FuckAccessToken />
      <GetMe />
      <LogoutMe />
    </div>
  );
}

export default HomePage;
