import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Get the cookie header
  const cookieHeader = request.headers.get("cookie");

  // Extract the token if it exists
  const token = cookieHeader
    ?.split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];

  // If you need to verify the token before logging out, do it here
  if (!token) {
    return NextResponse.json({ error: "Token not found" }, { status: 401 });
  }

  // Invalidate the token by overwriting it with an expired cookie
  const expiredCookie = `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`;
  const response = NextResponse.json({ message: "Successfully logged out" });
  response.headers.set("Set-Cookie", expiredCookie);

  return response;
}
