import { getToken } from "next-auth/jwt"; // Importing the getToken function from NextAuth
import { NextRequest, NextResponse } from "next/server";

// NextAuth-specific middleware
export async function nextAuthMiddleware(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      // No session found
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Session is valid; allow the request to proceed
    return null; // Proceed with the request
  } catch (error) {
    console.error("Error in NextAuth middleware:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
