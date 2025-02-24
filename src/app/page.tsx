import Button from "@/components/ui/Button";
import Link from "next/link";
import ThemeToggle from "@/app/_components/ThemeToggle";
import React from "react";

async function HomePage() {
  return (
    <div>
      <ThemeToggle />
      <Button>outline</Button>
      <Button variant="link">link</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="active">active</Button>
      <Button variant="error" asChild>
        <Link href="/login">go to page</Link>
      </Button>
    </div>
  );
}

export default HomePage;
