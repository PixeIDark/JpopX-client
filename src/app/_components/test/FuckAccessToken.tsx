"use client";

import Button from "@/components/ui/Button";
import { getSession } from "next-auth/react";
import { updateSession } from "@/lib/next-auth/nextAuthActions";

function FuckAccessToken() {
  const a = async () => {
    const session = await getSession();
    console.log(session);
    await updateSession({
      accessToken: "f",
      refreshToken: session?.user.refreshToken,
    });
  };

  return <Button onClick={a}>Fuck AccessToken!</Button>;
}

export default FuckAccessToken;
