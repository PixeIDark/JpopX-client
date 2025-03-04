import Button from "@/components/ui/Button";
import { getSession } from "next-auth/react";
import { signOutAction } from "@/lib/next-auth/nextAuthActions";

function LogoutMe() {
  const a = async () => {
    let session = await getSession();
    console.log(session);
    await signOutAction();
    session = await getSession();
    console.log(session);
  };

  return <Button onClick={a}>log out</Button>;
}

export default LogoutMe;
