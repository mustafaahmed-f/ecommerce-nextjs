import { signToken } from "@/app/_lib/tokenMethods";
import connectDB from "@/app/_mongodb/dbConnect";
import userModel from "@/app/_mongodb/models/userModel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Parse the request body
  try {
    console.log("Before accessing request");
    const { email, password } = await request.json();
    await connectDB();
    // const user = await userModel.findOne({ email }).select("-password");
    const user = await userModel.findOne({ email });
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
