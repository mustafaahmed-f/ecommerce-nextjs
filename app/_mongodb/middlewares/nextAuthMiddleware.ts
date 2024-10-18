import { auth } from "@/app/_lib/auth";
import { NextRequest, NextResponse } from "next/server";

// NextAuth-specific middleware
export async function nextAuthMiddleware(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // If session is valid, allow the request to proceed
    return null;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
