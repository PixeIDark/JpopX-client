import Button from "@/components/ui/Button";
import { usersApi } from "@/api/users";

function GetMe() {
  const a = async () => {
    const b = await usersApi.me();
    console.log(b);
  };

  return <Button onClick={a}>Get me</Button>;
}

export default GetMe;
