import { NextResponse } from "next/server";
import { signOut } from "@/auth";

export async function POST() {
  try {
    await signOut({ redirect: false });

    return NextResponse.json({
      success: true,
      redirect: "/login",
    });
  } catch (error) {
    console.error("Failed Route SignOut:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
