import bcrypt from "bcrypt";
import { signToken } from "@/app/_lib/tokenMethods";
import userModel from "@/app/_mongodb/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Parse the request body
  const { email, password } = await request.json();
  const user = await userModel.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  // Generate token and set it as an HTTP-only cookie
  const token = signToken({
    payload: { id: user._id, email: user.email, provider: "system" },
    expiresIn: "1d",
  });

  // Create the cookie options
  const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`;

  // Set the cookie in the response header
  const response = NextResponse.json({ message: "success" });
  response.headers.set("Set-Cookie", cookie);

  return response;
}
