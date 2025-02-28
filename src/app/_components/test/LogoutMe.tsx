import Button from "@/components/ui/Button";
import { getSession, signOut } from "next-auth/react";

function LogoutMe() {
  const a = async () => {
    let session = await getSession();
    console.log(session);
    await signOut({ redirect: false });
    session = await getSession();
    console.log(session);
  };

  return <Button onClick={a}>log out</Button>;
}

export default LogoutMe;
