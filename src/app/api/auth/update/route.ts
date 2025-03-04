import { NextRequest, NextResponse } from "next/server";
import { update } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const sessionData = await req.json();

    await update(sessionData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed Route Update", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
