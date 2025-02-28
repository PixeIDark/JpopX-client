import Button from "@/components/ui/Button";
import { getSession, signIn } from "next-auth/react";

function FuckAccessToken() {
  const a = async () => {
    const session = await getSession();
    console.log(session);
    const result = await signIn("Refresh", {
      refreshToken: session?.user.refreshToken,
      accessToken: "f",
      redirect: false,
    });
  };

  return <Button onClick={a}>Fuck AccessToken!</Button>;
}

export default FuckAccessToken;
