import Button from "@/components/ui/Button";
import Link from "next/link";
import { useLogoutMutation } from "@/query/auth/mutations/useLogoutMutation";
import { useDeleteAccountMutation } from "@/query/users/mutations/useDeleteAccountMutation";

function ProfileButtons() {
  const { mutate: logoutMutate, isPending: logoutIsPending } = useLogoutMutation();
  const { mutate: deleteAccount, isPending: deleteAccountIsPending } = useDeleteAccountMutation();

  return (
    <div className="flex flex-col gap-3">
      <Button variant="ghost" asChild>
        <Link href="/profile/verification/name">Change Name</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/profile/verification/password">Change Password</Link>
      </Button>
      <Button
        onClick={() => logoutMutate()}
        disabled={logoutIsPending}
        isPending={logoutIsPending}
        variant="outline"
      >
        Log Out
      </Button>
      <Button
        onClick={() => deleteAccount()}
        disabled={deleteAccountIsPending}
        isPending={deleteAccountIsPending}
        variant="error"
      >
        Delete Account
      </Button>
    </div>
  );
}

export default ProfileButtons;
