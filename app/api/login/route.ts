import bcrypt from "bcrypt";
import { signToken } from "@/app/_lib/tokenMethods";
import userModel from "@/app/_mongodb/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/_mongodb";

export async function POST(request: NextRequest) {
  // Parse the request body
  try {
    console.log("Before accessing request");
    const { email, password } = await request.json();
    const client = await clientPromise;
    const db = client.db("ecommerce_nextjs");
    // const user = await userModel.findOne({ email }).select("-password");
    const user = await db.collection("users").findOne({ email });
    console.log("user", user);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Generate token and set it as an HTTP-only cookie
    const token = signToken({
      payload: {
        id: user._id,
        email: user.email,
        provider: "system",
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      expiresIn: "1d",
    });

    // Create the cookie options
    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`;
    console.log("Before sending back a response !!");
    // Set the cookie in the response header
    const response = NextResponse.json({ message: "success", user });
    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error: any) {
    throw new Error(error.message, { cause: 500 });
  }
}
